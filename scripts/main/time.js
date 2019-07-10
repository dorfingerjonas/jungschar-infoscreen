window.addEventListener('load', () => {
    let currentTime = new Date();
    const timeElement = document.getElementById('currentTime');
    const dayElement = document.getElementById('currentDay');

    setTime();

    setInterval(() => {
        setTime();
    }, 1000);
    
    function setTime() {
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
        
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        
        dayElement.textContent = currentTime.toLocaleDateString('de-DE', options);
        timeElement.textContent = `${hour}:${minute} Uhr`;
    }
});