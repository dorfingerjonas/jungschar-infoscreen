window.addEventListener('load', () => {

    const data = {"coord":{"lon":14.87,"lat":48.12},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":21.93,"pressure":1017,"humidity":47,"temp_min":16.67,"temp_max":25},"visibility":10000,"wind":{"speed":4.1,"deg":290},"clouds":{"all":20},"dt":1562095191,"sys":{"type":1,"id":6874,"message":0.0078,"country":"AT","sunrise":1562036685,"sunset":1562094234},"timezone":7200,"id":2782555,"name":"Amstetten","cod":200}
 
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

    let i = document.createElement('i');
    i.setAttribute('class', 'far fa-sun');

    newEntry.appendChild(i);

    const text = document.createElement('p');

    weatherData[0].value = Math.round(parseFloat(weatherData[0].value));

    text.textContent = weatherData[0].value + ' °C';

    newEntry.appendChild(text);

    contentWrapper.appendChild(newEntry);
});