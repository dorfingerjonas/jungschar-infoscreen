window.addEventListener('load', () => {
    const parent = document.getElementById('bottomBar');
    const socket = getSocket();

    socket.emit('request news', null);

    socket.on('weather', data => {
        removeAllChildren(parent);

        console.table(data);
    });
});