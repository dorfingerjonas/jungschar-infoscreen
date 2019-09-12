let isFocused = false;

window.addEventListener('keydown', (event) => {

    const video = document.getElementById('currentVid');
    let page = '';

    const boxes = [
        document.getElementById('mainScreen'),
        document.getElementById('sideScreen'),
        document.getElementById('newsScreen'),
        document.getElementById('userInterface'),
        document.getElementById('jobWrapper'),
        document.getElementById('newsInterfaceWrapper'),
        document.getElementById('nav')
    ];

    if (event.key.toLowerCase() === 'j' && !isFocused) {
        for (const box of boxes) {
            box.style.display = 'none';
        }
        document.getElementById('jobWrapper').style.display = 'flex';
        video.pause();
        page = 'job';
    } else if (event.key.toLowerCase() === 'm' && !isFocused) {
        for (const box of boxes) {
            box.style.display = 'flex';
        }
        document.getElementById('jobWrapper').style.display = 'none';
        document.getElementById('userInterface').style.display = 'none';
        video.play();
        page = 'main'
    } else if (event.key.toLowerCase() === 'u' && !isFocused) {
        for (const box of boxes) {
            box.style.display = 'none';
        }
        document.getElementById('jobsInterfaceWrapper').style.display = 'none';
        document.getElementById('navBorder').style.left = 0;
        document.getElementById('userInterface').style.display = 'flex';
        document.getElementById('newsInterfaceWrapper').style.display = 'flex';
        document.getElementById('nav').style.display = 'flex';
        document.getElementById('errorField').textContent = '';
        video.pause();
        page = 'interface';
    } else if (event.key.toLowerCase() === 'p' && !isFocused) {
        window.open('./pages/presentation.html', '_blank');
    }

    firebase.database().ref('public/currentPage').set({
        page: page
    });
});

window.addEventListener('load', () => {
    const boxes = document.getElementsByTagName('input');
    const textareas = document.getElementsByTagName('textarea');

    firebase.database().ref('public/currentPage').set({
        page: 'main'
    });

    for (const box of boxes) {
        box.addEventListener('focus', () =>{ isFocused = true });
        box.addEventListener('blur', () =>{ isFocused = false });
    }

    for (const box of textareas) {
        box.addEventListener('focus', () =>{ isFocused = true });
        box.addEventListener('blur', () =>{ isFocused = false });
    }
});