window.addEventListener('load', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCNE1gB1GE1pFiC4MRcWpQjX0oi7YjB7XQ",
        authDomain: "jungscharlager-infoscreen.firebaseapp.com",
        databaseURL: "https://jungscharlager-infoscreen.firebaseio.com",
        projectId: "jungscharlager-infoscreen",
        storageBucket: "",
        messagingSenderId: "590263811336",
        appId: "1:590263811336:web:a74fb5400dc96ce7"
    };
      
    firebase.initializeApp(firebaseConfig);

    setInterval(() => {
        nextNews();
    }, 15000);

    let content = [];

    firebase.database().ref('public/news').once('value').then((snapshot) => {

        content = snapshot.val();

        for (let i = 0; i < content.length; i++) {
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

            if (i !== 0) {
                newNews.setAttribute('class', 'hide');
                newNews.style.opacity = 0;
            }

            contentWrapper.appendChild(newNews);
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
});