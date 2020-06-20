window.addEventListener('load', () => {
    const parent = document.getElementById('logoBox');
    const socket = getSocket();

    socket.emit('request logos', null);    

    socket.on('logos', files => {
        removeAllChildren(parent);
        
        if (files.length === 1) {
            const img = document.createElement('img');
            img.src = `../media/img/logos/${files[0]}`;
            
            parent.appendChild(img);
        } else if (files.length >= 2) {
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement('img');
                img.src = `../media/img/logos/${files[i]}`;
                
                if (i !== 0) img.classList.add('hide');
                
                parent.appendChild(img);
            }
            
            setInterval(() => {
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
                        if (images[0].clientHeight > images[0].clientWidth || images[0].clientHeight === images[0].clientWidth) {
                            images[0].style.width = '40%';
                        } else {
                            images[0].style.width = '';
                        }

                        setTimeout(() => {
                            images[0].style.opacity = 1;
                        }, 50);
                    }, 50);
                }, 310);
            }, 15000);
        }
    });
});