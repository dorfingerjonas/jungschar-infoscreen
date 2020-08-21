window.addEventListener('load', () => {
    const parent = document.getElementById('timeBox');
    const socket = getSocket();

    socket.emit('request time', null);

    socket.on('time', timestamp => {
        removeAllChildren(parent);

        const time = new Date(timestamp);
        const timeText = document.createElement('span');
        const dateText = document.createElement('span');

        timeText.textContent = formatTime(time);
        dateText.textContent = formatDate(time);

        setInterval(() => {
            timeText.textContent = formatTime(new Date());
            dateText.textContent = formatDate(new Date());
        }, 500);

        parent.appendChild(timeText);
        parent.appendChild(dateText);
    });

    function formatTime(time) {
        return `${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)} Uhr`;
    }

    function formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        
        return new Intl.DateTimeFormat('de-AT', options).format(date);
    }
});