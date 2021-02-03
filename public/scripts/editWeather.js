window.addEventListener('load', () => {
    const parent = document.getElementById('weatherWrapper');
    const socket = getSocket();
    let customWeatherData;

    socket.emit('get api infos', null);

    socket.on('api infos', data => {
        removeAllChildren(parent);

        socket.emit('get custom weather', null);

        printShortcutButtons();
        printCity(data);
        printApiKey(data);
    });

    socket.on('customWeather', data => {
        socket.emit('get weather icons', null);
        customWeatherData = data;

        printChangeState(data);
    });

    socket.on('weather icons', icons => {
        printModifyCustomWeather(icons, customWeatherData);
    });

    function printShortcutButtons() {
        const newButtonBar = document.createElement('div');
        const refresh = document.createElement('div');
        const refreshPresentation = document.createElement('div');

        refresh.textContent = 'Aktualisieren';
        refreshPresentation.textContent = 'Präsentation aktualisieren';

        refresh.classList.add('weatherShortCutButton');
        refreshPresentation.classList.add('weatherShortCutButton');
        newButtonBar.classList.add('weatherShortCutBar');

        refresh.addEventListener('click', () => {
            socket.emit('get api infos', null);
            socket.emit('get custom weather', null);
            socket.emit('get weather icons', null);
            showFeedbackMessage(true, 'Wetter aktualisiert');
        });

        refreshPresentation.addEventListener('click', () => {
            socket.emit('request weather', null);
            showFeedbackMessage(true, 'Präsentation aktualisert');
        });

        newButtonBar.appendChild(refreshPresentation);
        newButtonBar.appendChild(refresh);
        parent.appendChild(newButtonBar);
    }

    function printCity(city) {
        const cityWrapper = document.createElement('div');
        const row = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const input = document.createElement('input');
        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');

        input.type = 'text';
        input.readOnly = true;
        input.value = city;
        input.placeholder = 'Stadt';

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                input.readOnly = false;
                input.classList.add('active');

                input.oldVal = input.value;
                
                startEditBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                input.value = input.oldVal;
                input.readOnly = true;
                input.classList.remove('active');
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                if (input.value.trim() !== '') {
                    input.readOnly = true;
                    input.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    
                    socket.emit('update city', input.value);

                    showFeedbackMessage(true, 'Stadt aktualisiert');
                } else {
                    showFeedbackMessage(false, 'Stadt ist leer');
                }
            }
        });

        row.classList.add('shortCutRow');
        row.setAttribute('id', 'cityRow');
        cityWrapper.setAttribute('id', 'cityWrapper');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        
        inputWrapper.appendChild(input);
        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        row.appendChild(inputWrapper);
        row.appendChild(buttonWrapper);
        parent.appendChild(row);
    }

    function printApiKey(key) {
        const apiWrapper = document.createElement('div');
        const row = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const input = document.createElement('input');
        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');

        input.type = 'text';
        input.readOnly = true;
        input.value = key;
        input.placeholder = 'API-Key';

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                input.readOnly = false;
                input.classList.add('active');

                input.oldVal = input.value;
                
                startEditBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                input.value = input.oldVal;
                input.readOnly = true;
                input.classList.remove('active');
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                if (input.value.trim() !== '') {
                    input.readOnly = true;
                    input.classList.remove('active');
                    
                    saveEditBtn.classList.add('disable');
                    cancelEditBtn.classList.add('disable');
                    startEditBtn.classList.remove('disable');
                    
                    socket.emit('update apiKey', input.value);

                    showFeedbackMessage(true, 'API-Key aktualisiert');
                } else {
                    showFeedbackMessage(false, 'API-Key ist leer');
                }
            }
        });

        row.classList.add('shortCutRow');
        row.setAttribute('id', 'apiRow');
        apiWrapper.setAttribute('id', 'apiWrapper');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        
        inputWrapper.appendChild(input);
        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        row.appendChild(inputWrapper);
        row.appendChild(buttonWrapper);
        parent.appendChild(row);
    }

    function printChangeState(state) {
        const stateWrapper = document.createElement('div');
        const row = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');

        input.type = 'checkbox';
        input.readOnly = true;
        input.checked = state;

        input.setAttribute('id', 'customWeatherActive');

        label.textContent = 'Individuelles Wetter aktiv';

        input.addEventListener('click', () => {
            if (!input.className.includes('active')) {
                input.checked = !input.checked;
            }
        });

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                input.readOnly = false;
                input.classList.add('active');

                input.oldVal = input.checked;
                
                startEditBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                input.checked = input.oldVal;
                input.readOnly = true;
                input.classList.remove('active');
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                input.readOnly = true;
                input.classList.remove('active');
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');
                
                socket.emit('update weather state', input.checked);

                showFeedbackMessage(true, 'Individuelles Wetter aktualisiert');
            }
        });

        row.classList.add('shortCutRow');
        row.setAttribute('id', 'stateRow');
        stateWrapper.setAttribute('id', 'stateWrapper');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        row.appendChild(inputWrapper);
        row.appendChild(buttonWrapper);
        parent.appendChild(row);
    }

    function printModifyCustomWeather(icons, weatherData) {
        const modifyWeatherWrapper = document.createElement('div');
        const row = document.createElement('div');
        const rightWrapper = document.createElement('div');
        const leftWrapper = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const iconWrapper = document.createElement('div');
        const startEditBtn = document.createElement('div');
        const saveEditBtn = document.createElement('div');
        const cancelEditBtn = document.createElement('div');
        const inputs = [
            {type: 'number', label: 'Temperatur in °C', value: weatherData.temp, placeholder: 'Temperatur', id: 'inputTemperature'},
            {type: 'number', label: 'min. Temperatur in °C', value: weatherData.minTemp, placeholder: 'min. Temperatur', id: 'inputMinTemperature'},
            {type: 'number', label: 'max. Temperatur in °C', value: weatherData.maxTemp, placeholder: 'max. Temperatur', id: 'inputMaxTemperature'},
            {type: 'number', label: 'Windgeschwindigkeit in km/h', value: weatherData.speed, placeholder: 'Windgeschwindigkeit', id: 'inputSpeed'},
            {type: 'number', label: 'Luftdruck in hPa', value: weatherData.pressure, placeholder: 'Luftdruck', id: 'inputPressure'},
            {type: 'number', label: 'Luftfeuchtigkeit in %', value: weatherData.humidity, placeholder: 'Luftfeuchtigkeit', id: 'inputHumidity'},
        ];

        for (const icon of icons) {
            const img = document.createElement('img');
            img.src = `../icons/${('0' + parseInt(icon)).slice(-2)}.svg`;
            img.alt = 'Bild konnte nicht geladen werden.';
            img.classList.add('customWeatherIcon');
            img.setAttribute('id', `weatherIcon${icon}`);

            if (icon === `${weatherData.icon}.svg`) {
                img.classList.add('selectedWeatherIcon');
            }

            img.addEventListener('click', () => {
                if (iconWrapper.active) {
                    for (let i = 0; i < img.parentElement.childElementCount; i++) {
                        const element = img.parentElement.children[i];
                        
                        element.classList.remove('selectedWeatherIcon');
                    }
    
                    img.classList.add('selectedWeatherIcon');
                }
            });

            iconWrapper.appendChild(img);
            iconWrapper.active = false;
        }

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const newInput = document.createElement('div');
            const elm = document.createElement('input');
            const label = document.createElement('label');
            
            elm.type = input.type;
            elm.value = input.value;
            elm.placeholder = input.placeholder;
            elm.readOnly = true;
            elm.setAttribute('id', input.id);
            label.textContent = input.label;

            inputs[i].elm = elm;

            newInput.appendChild(label);
            newInput.appendChild(elm);
            inputWrapper.appendChild(newInput);
        }

        startEditBtn.textContent = 'Bearbeiten';
        saveEditBtn.textContent = 'Speichern';
        cancelEditBtn.textContent = 'Abbrechen';

        saveEditBtn.classList.add('disable');
        cancelEditBtn.classList.add('disable');

        startEditBtn.addEventListener('click', () => {                
            if (!startEditBtn.className.includes('disable')) {
                for (const input of inputs) {
                    input.elm.readOnly = false;
                    input.elm.oldVal = input.elm.value;   
                    input.elm.classList.add('active');
                }

                iconWrapper.oldVal = `weatherIcon${weatherData.icon}.svg`;
                iconWrapper.active = true;
                
                startEditBtn.classList.add('disable');
                saveEditBtn.classList.remove('disable');
                cancelEditBtn.classList.remove('disable');
            }
        });

        cancelEditBtn.addEventListener('click', () => {
            if (!cancelEditBtn.className.includes('disable')) {
                for (const input of inputs) {
                    input.elm.readOnly = true;
                    input.elm.value = input.elm.oldVal;
                    input.elm.classList.remove('active');   
                }

                document.getElementById(iconWrapper.oldVal).click();
                iconWrapper.active = false;
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');
            }
        });

        saveEditBtn.addEventListener('click', () => {
            if (!saveEditBtn.className.includes('disable')) {
                for (const input of inputs) {
                    input.elm.readOnly = true;
                    input.elm.classList.remove('active');

                    if (input.elm.value.trim() === '') {    
                        input.elm.value = 0;
                    }
                }

                iconWrapper.active = false;
                
                saveEditBtn.classList.add('disable');
                cancelEditBtn.classList.add('disable');
                startEditBtn.classList.remove('disable');

                const customWeather = {
                    active: document.getElementById('customWeatherActive').checked,
                    temp: document.getElementById('inputTemperature').value,
                    minTemp: document.getElementById('inputMinTemperature').value,
                    maxTemp: document.getElementById('inputMaxTemperature').value,
                    speed: document.getElementById('inputSpeed').value,
                    pressure: document.getElementById('inputPressure').value,
                    humidity: document.getElementById('inputHumidity').value,
                    icon: document.getElementsByClassName('selectedWeatherIcon')[0].id.replace('weatherIcon', '').substring(0, 2)
                };
                
                socket.emit('update custom weather', customWeather);

                showFeedbackMessage(true, 'Individuelles Wetter aktualisiert');
            }
        });

        row.classList.add('shortCutRow');
        row.setAttribute('id', 'modifyRow');
        modifyWeatherWrapper.setAttribute('id', 'modifyWeatherWrapper');
        iconWrapper.classList.add('iconWrapper');
        inputWrapper.classList.add('inputWrapper');
        buttonWrapper.classList.add('buttonWrapper');
        rightWrapper.classList.add('rightWrapper');
        leftWrapper.classList.add('leftWrapper');

        buttonWrapper.appendChild(startEditBtn);
        buttonWrapper.appendChild(saveEditBtn);
        buttonWrapper.appendChild(cancelEditBtn);
        leftWrapper.appendChild(iconWrapper);
        rightWrapper.appendChild(buttonWrapper);
        rightWrapper.appendChild(inputWrapper);
        row.appendChild(leftWrapper);
        row.appendChild(rightWrapper);
        parent.appendChild(row);
    }
});