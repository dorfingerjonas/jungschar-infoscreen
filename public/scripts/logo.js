window.addEventListener('load', () => {
    const parent = document.getElementById('logoBox');
    const socket = getSocket();
    let interval;

    socket.emit('request logos', null);    

    socket.on('logos', files => {
        clearInterval(interval);
        removeAllChildren(parent);
        
        if (files.length === 1) {
            const img = document.createElement('img');
            img.src = `/${files[0]}`;
            
            parent.appendChild(img);

            setTimeout(() => {
                resizeImage(img);
            }, 30);
        } else if (files.length >= 2) {
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement('img');
                img.src = `/${files[i]}`;
                
                if (i !== 0) img.classList.add('hide');
                
                parent.appendChild(img);

                setTimeout(() => {
                    resizeImage(img);
                }, 30);
            }

            interval = setInterval(() => {
                const images = parent.children;
                const rack = images[images.length - 1].src;

                images[0].style.opacity = 0;

                for (let i = images.length - 1; i > 0; i--) {
                    images[i].src = images[i - 1].src;
                    images[i].style.opacity = 0;
                }

                setTimeout(() => {
                    images[0].src = rack;

                    setTimeout(() => {
                        resizeImage(images[0]);

                        setTimeout(() => {
                            images[0].style.opacity = 1;
                        }, 50);
                    }, 50);
                }, 310);
            }, 15000);
        } else {
            parent.appendChild(createNoElementsMessage());
        }
    });
});

function resizeImage(img) {
    if (img.clientHeight > img.clientWidth
        || img.clientHeight + 50 > img.clientWidth
        && img.clientHeight - 50 < img.clientWidth
        || img.clientHeight === img.clientWidth) {
        img.style.width = '40%';
    } else {
        img.style.width = '';
    }
}
