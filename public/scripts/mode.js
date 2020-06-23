window.addEventListener('load', () => {
    const socket = getSocket();
    const mainScreen = document.getElementById('mainScreen');
    const jobScreen = document.getElementById('jobScreen');

    socket.on('mode', data => {
        if (data === 'main') {
            jobScreen.classList.add('hide');
            mainScreen.classList.remove('hide');
        } else if (data === 'job'){
            mainScreen.classList.add('hide');
            jobScreen.classList.remove('hide');
        }
    });
});