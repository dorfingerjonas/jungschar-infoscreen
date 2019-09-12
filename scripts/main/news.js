window.addEventListener('load', () => {
    let interval;
    news(); 
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'n') {
        let wrapper = document.getElementById('newsWrapper');
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }

    clearInterval(interval);

    news();
    }
});

function news() {
    interval = setInterval(() => {
        nextNews();
    }, 15000);

    let content = [];

    firebase.database().ref('public/news').once('value').then((snapshot) => {

        content = snapshot.val();
        let first = true;

        for (let i = 0; i < content.length; i++) {
            if (content[i].active) {
                let title = content[i].title;
                let text = content[i].text;

                const contentWrapper = document.getElementById('newsWrapper');
                const newNews = document.createElement('div');

                let titleElm = document.createElement('h2');
                let textElm = document.createElement('p');
            
                let elements = [titleElm, textElm];
                let output = [title, text];

                for (let i = 0; i < elements.length; i++) {
                    elements[i].textContent = output[i];
                    newNews.appendChild(elements[i]);
                }

                if (!first) {
                    newNews.setAttribute('class', 'hide');
                    newNews.style.opacity = 0;
                }

                first = false;

                contentWrapper.appendChild(newNews);
            }
        }
    });

    function nextNews() {
        const news = document.getElementById('newsWrapper').getElementsByTagName('div');
        let visibleIndex = -1;

        for (let i = 0; i < news.length; i++) {

            if (!news[i].className.includes('hide')) visibleIndex = i;

            news[i].style.opacity = 0;

            setTimeout(() => {
                news[i].setAttribute('class', 'hide');
            }, 500);
        }

        setTimeout(() => {
            if (visibleIndex === news.length - 1) visibleIndex = 0;
            else visibleIndex++;

            news[visibleIndex].removeAttribute('class', 'hide');
            news[visibleIndex].style.opacity = 1;
        }, 700);
    }
}