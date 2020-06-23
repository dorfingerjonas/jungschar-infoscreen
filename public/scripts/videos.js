window.addEventListener('click', () => {
    const parent = document.getElementById('video');
    const socket = getSocket();

    socket.emit('request videos', null);    

    socket.on('videos', files => {
        removeAllChildren(parent);

        if (files.length === 1) {
            const video = createVideo(files[0]);
            
            setInterval(() => {
                video.play();
            }, video.duration * 1000 + 100);

            parent.appendChild(video);
        } else if (files.length >= 2) {        
            for (let i = 0; i < files.length; i++) {
                const video = createVideo(files[i]);

                if (i !== 0) {
                    video.classList.add('hide');
                } else {
                    video.play();
                }

                parent.appendChild(video);
            }

            setTimeout(() => {
                if (parent.children[0] == NaN) {
                    setTimeout(() => {
                        setTimeout(() => {
                            next();
                        }, parent.children[0].duration * 1000);
                    }, 20);
                } else {
                    setTimeout(() => {
                        next();
                    }, parent.children[0].duration * 1000);
                }
            }, 60);
        }

        function next() {
            const videos = parent.children;
            let rack = videos[0].src;

            for (let i = 0; i < videos.length - 1; i++) {
                videos[i].src = videos[i + 1].src;
            }            

            videos[videos.length - 1].src = rack;
            
            videos[0].play();

            setTimeout(() => {
                if (videos[0].duration === NaN) {
                    setTimeout(() => {
                        setTimeout(() => {
                            next();
                        }, videos[0].duration * 1000);
                    }, 20);
                } else {
                    setTimeout(() => {
                        next();
                    }, videos[0].duration * 1000 + 40);
                }
            }, 60);
        }
    });
});

function createVideo(file) {
    const video = document.createElement('video');

    video.alt = 'cannot display video';
    video.draggable = false;
    video.muted = true;
    video.src = `../media/video/${file}`;
    video.type = `video/${file.split('.')[1]}`;

    return video;
}