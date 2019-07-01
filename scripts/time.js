window.addEventListener('load', () => {
    let currentTime = new Date();
    const timeElement = document.getElementById('currentTime');

    setInterval(() => {
        currentTime = new Date();
        let seconds = currentTime.getSeconds();
        let minute = currentTime.getMinutes();
        let hour = currentTime.getHours();

        
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        
        if (minute < 10) {
            minute = `0${minute}`;
        }

        if (hour < 10) {
            hour = `0${hour}`;
        }

        timeElement.textContent = `${currentTime.getDay()}. ${getMonthAsWord(currentTime.getMonth())} ${currentTime.getFullYear()}, ${hour}:${minute}:${seconds} Uhr`;
    }, 1000);
});

function getMonthAsWord(month) {
    switch (month) {
        case 0: return 'Jänner';
        case 1: return 'Februar';
        case 2: return 'März';
        case 3: return 'April';
        case 4: return 'Mai';
        case 5: return 'Juni';
        case 6: return 'Juli';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'Oktober';
        case 10: return 'November';
        case 11: return 'Dezember'; 
    }
}