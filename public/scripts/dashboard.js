window.addEventListener('load', () => {
    const socket = getSocket();
    const openPresentationWindow = document.getElementById('openPresentationWindow');
    const closePresentationWindow = document.getElementById('closePresentationWindow');
    const refreshPresentation = document.getElementById('refreshPresentation');
    const switchScreen = document.getElementById('switchScreens');

    switchScreen.children[0].activate = true;

    openPresentationWindow.addEventListener('click', () =>{
        const presentationWindow  = window.open('./presentation', 'presentationWindow', `modal=yes,alwaysRaised=yes`);
        showFeedbackMessage(true, 'Präsentation geöffnet')

        closePresentationWindow.addEventListener('click', () => {
            presentationWindow.close();
            showFeedbackMessage(true, 'Präsentation geschlossen')
        });
    });

    socket.on('mode', mode => {
        if (mode === 'main') {
            switchScreen.children[0].textContent = 'Job Ansicht aktivieren';
            switchScreen.children[0].activate = true;
        } else if (mode === 'job') {
            switchScreen.children[0].textContent = 'Job Ansicht deaktivieren';
            switchScreen.children[0].activate = false;
        }
    });

    switchScreen.addEventListener('click', () => {
        if (switchScreen.children[0].activate) {
            socket.emit('request mode change', 'job');
            showFeedbackMessage(true, 'Job Ansicht aktiviert');
        } else {
            socket.emit('request mode change', 'main');
            showFeedbackMessage(true, 'Job Ansicht deaktiviert');
        }
    });

    refreshPresentation.addEventListener('click', () => {
        socket.emit('request currency', null);
        socket.emit('request jobs', null);
        socket.emit('request user svg', null);
        socket.emit('request logos', null);
        socket.emit('request news', null);
        socket.emit('request time', null);
        socket.emit('request videos', null);
        socket.emit('request weather', null);
        showFeedbackMessage(true, 'Präsentation aktualisiert')
    });
});