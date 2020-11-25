window.addEventListener('load', () => {
    const parent = document.getElementById('weatherBox');
    const socket = getSocket();

    socket.emit('request weather', null);

    socket.on('weather', data => {
        removeAllChildren(parent);

        if (data !== undefined && data !== null && data.code === 200) {
            const detailedWrapper = document.createElement('div');
            const overviewWrapper = document.createElement('div');
    
            const weatherData = [
                {name: 'min. Temperatur', value: `${Math.round(data.minTemp)}°C`},
                {name: 'max. Temperatur', value: `${Math.round(data.maxTemp)}°C`},
                {name: 'Windgeschwindigkeit', value: `${data.speed}km/h`},
                {name: 'Luftdruck', value: `${data.pressure}hPa`},
                {name: 'Luftfeuchtigkeit', value: `${data.humidity}%`}
            ];
    
            const icon = document.createElement('img');
            icon.src = `../icons/${('0' + parseInt(data.icon)).slice(-2)}.svg`;
            icon.alt = 'Bild konnte nicht geladen werden.';
    
            const temp = document.createElement('span');
            temp.textContent = `${parseInt(Math.round(data.temp))}°C`;
    
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
        } else {
            parent.appendChild(createNoElementsMessage());
        }
    });
});