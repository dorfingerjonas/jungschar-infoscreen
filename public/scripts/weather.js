window.addEventListener('load', () => {
    const parent = document.getElementById('weatherBox');
    const socket = getSocket();

    socket.emit('request weather', null);

    socket.on('weather', data => {
        removeAllChildren(parent);

        const detailedWrapper = document.createElement('div');
        const overviewWrapper = document.createElement('div');

        const weatherData = [
            {name: 'min. Temperatur', value: `${data.main.temp_min}°C`},
            {name: 'max. Temperatur', value: `${data.main.temp_max}°C`},
            {name: 'Windgeschwindigkeit', value: `${data.wind.speed}km/h`},
            {name: 'Luftdruck', value: `${data.main.pressure}hPa`},
            {name: 'Luftfeuchtigkeit', value: `${data.main.humidity}%`}
        ];

        const icon = document.createElement('img');
        icon.src = `../icons/${('0' + parseInt(data.weather[0].icon)).slice(-2)}.svg`;
        icon.alt = 'Bild konnte nicht geladen werden.';

        const temp = document.createElement('span');
        temp.textContent = `${parseInt(Math.round(data.main.temp))}°C`;

        for (const data of weatherData) {
            const newElement = document.createElement('div');
            const name = document.createElement('span');
            const value = document.createElement('span');

            name.textContent = data.name;
            value.textContent = data.value.replace('.', ',');

            newElement.appendChild(name);
            newElement.appendChild(value);
            overviewWrapper.appendChild(newElement);
        }

        detailedWrapper.appendChild(icon);
        detailedWrapper.appendChild(temp);
        parent.appendChild(detailedWrapper);
        parent.appendChild(overviewWrapper);
    });
});