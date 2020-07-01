window.addEventListener('load', () => {
    const parent = document.getElementById('news');
    const socket = getSocket();
    let interval;

    socket.emit('request news', null);

    socket.on('news', data => {
        removeAllChildren(parent);
        clearInterval(interval);

        if (data.length === 1) {
            if (data[0].isVisible) {
                const news = createNews(data[0]);

                parent.appendChild(news);
            }
        } else if (data.length >= 2) {        
            for (let i = 0; i < data.length; i++) {
                if (data[i].isVisible) {
                    const news = createNews(data[i]);
                    
                    if (i !== 0) {
                        news.classList.add('hide');
                    } else {
                        news.style.top = 0;
                    }

                    parent.appendChild(news);
                }
            }

            interval = setInterval(() => {
                for (let i = 0; i < parent.children.length; i++) {
                    const news = parent.children[i];
                    
                    if (!news.className.includes('hide')) {
                        i + 1 === parent.children.length ? i = 0 : i++;

                        parent.children[i].classList.remove('hide');
                        news.classList.add('hide');

                        i = parent.children.length;
                    }
                }
            }, 10000);
        }
    });
});

function createNews(news) {
    const wrapper = document.createElement('div');
    const headline = document.createElement('h2');
    const content = document.createElement('p');

    headline.textContent = news.headline;
    content.textContent = news.content;

    wrapper.appendChild(headline);
    wrapper.appendChild(content);

    return wrapper;
}