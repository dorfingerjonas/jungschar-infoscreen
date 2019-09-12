window.addEventListener('load', printWeather);

window.addEventListener('keydown', () => {

    if (event.key === 'w') {
        let wrappers = [
            document.getElementById('mainInfo'),
            document.getElementById('subInfos')
        ];

        for (const wrapper of wrappers) {            
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild);
            }
        }
        printWeather();
    }
});

function printWeather() {
    const key = 'aeeb25a43d3f412925346cf7e2c8b58d';

    fetch('https://api.openweathermap.org/data/2.5/weather?id=2782555&appid=' + key + '&units=metric')
    .then((resp) => {
        return resp.json()
    }).then((data) => {
    
        const temp = {name: 'Temperatur', value: data.main.temp + ''};
        const maxTemp = {name: 'bis: ', value: data.main.temp_max + ''};
        const windspeed = {name: 'Windgeschwindigkeit', value: data.wind.speed + ' KM/H'};
        const pressure = {name: 'Luftdruck', value: data.main.pressure + ' mb'};
        const humidity = {name: 'Luftfeuchtigkeit', value: data.main.humidity + '%'};
        const visibility = {name: 'Sichtweite', value: data.visibility + ' m'};

        const weatherData = [temp, maxTemp, windspeed, pressure, humidity, visibility];

        for (let i = 2; i < weatherData.length; i++) {
            const contentWrapper = document.getElementById('subInfos');
            const newEntry = document.createElement('div');

            let headline = document.createElement('h2');
            headline.textContent = weatherData[i].name;
            newEntry.appendChild(headline);

            let content = document.createElement('p');
            content.textContent = weatherData[i].value;
            newEntry.appendChild(content);

            weatherData[i].value = weatherData[i].value.replace('.', ',');

            contentWrapper.appendChild(newEntry);

            let hr = document.createElement('hr');

            if (i <= weatherData.length - 2) {
                contentWrapper.appendChild(hr);
            }
        }

        const contentWrapper = document.getElementById('mainInfo');
        const newEntry = document.createElement('div');
        
        let img = document.createElement('img');
        img.src = './img/sun.png';
        img.alt = 'cannot display img';
        newEntry.appendChild(img);

        const text = document.createElement('p');

        weatherData[0].value = Math.round(parseFloat(weatherData[0].value));

        text.textContent = weatherData[0].value + ' °C';

        newEntry.appendChild(text);

        contentWrapper.appendChild(newEntry);

    }).catch(() => {
        // catch any errors
    });
}