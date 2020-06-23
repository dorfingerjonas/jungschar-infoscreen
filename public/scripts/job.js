window.addEventListener('load', () => {
    const parent = document.getElementById('jobs');
    const socket = getSocket();

    socket.emit('request jobs', null);

    socket.on('jobs', data => {
        removeAllChildren(parent);
        
        
    });
});
