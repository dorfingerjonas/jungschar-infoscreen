window.addEventListener('click', () => {
    const parent = document.getElementById('video');
    const socket = getSocket();
    let playingVideo;

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
                    playingVideo = video;
                }

                parent.appendChild(video);
            }

            setTimeout(() => {
                setTimeout(() => {
                    next();
                }, playingVideo.duration * 1000 + 100);
            }, 60);
        }

        function next() {
            const videos = parent.children;
            let index = -1;

            for (let i = 0; i < videos.length; i++) {
                if (!videos[i].className.includes('hide')) {
                    index = i;
                }

                videos[i].classList.add('hide');
            }

            index === videos.length - 1 ? index = 0 : index++;

            videos[index].classList.remove('hide');
            videos[index].play();
            playingVideo = videos[index];

            setTimeout(() => {
                next();
            }, videos[index].duration * 1000 + 500);
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