let isFocused = false;

window.addEventListener('keydown', (event) => {

    const video = document.getElementById('currentVid');

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
    } else if (event.key.toLowerCase() === 'v' && !isFocused) {
        for (const box of boxes) {
            box.style.display = 'flex';
        }
        document.getElementById('jobWrapper').style.display = 'none';
        document.getElementById('userInterface').style.display = 'none';
        video.play();
    } else if (event.key.toLowerCase() === 'u' && !isFocused) {
        for (const box of boxes) {
            box.style.display = 'none';
        }
        document.getElementById('userInterface').style.display = 'flex';
        document.getElementById('newsInterfaceWrapper').style.display = 'flex';
        document.getElementById('nav').style.display = 'flex';
        document.getElementById('errorField').textContent = '';
        video.pause();
    } else if (event.key.toLowerCase() === 'p' && !isFocused) {
        window.open('./pages/presentation.html', '_blank');
        video.pause();
    }
});

window.addEventListener('load', () => {
    const boxes = document.getElementsByTagName('input');

    for (const box of boxes) {
        box.addEventListener('focus', () =>{ isFocused = true });
        box.addEventListener('blur', () =>{ isFocused = false });
    }
});