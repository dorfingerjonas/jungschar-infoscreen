const fs = require('fs');
const { promisify } = require('util');

class WeatherRepository {
    async updateCity(city) {
        const json = await this.getJSON();

        json.city = city;

        fs.writeFile('./data/weatherapi.json', JSON.stringify(json), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async updateKey(key) {
        const json = await this.getJSON();

        json.apiKey = key;

        fs.writeFile('./data/weatherapi.json', JSON.stringify(json), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAllIcons() {
        const iconList = [];
        const dirContent = await promisify(fs.readdir)('./public/icons');

        for (const file of dirContent) {
            if (!isNaN(parseInt(file.split('.')[0]))) {
                iconList.push(file);
            }
        }

        return iconList;
    }

    async getJSON() {
        const content = await promisify(fs.readFile)('./data/weatherapi.json', 'utf8');
        return content ? JSON.parse(content) : [];
    }

    async getCustomJSON() {
        const content = await promisify(fs.readFile)('./data/customWeather.json', 'utf8');
        return content ? JSON.parse(content) : [];
    }

    async updateCustomWeather(weather) {
        fs.writeFile('./data/customWeather.json', JSON.stringify(weather), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async changeCustomWeatherState(state) {
        const json = await this.getCustomJSON();

        json.active = state;

        fs.writeFile('./data/customWeather.json', JSON.stringify(json), err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

module.exports = WeatherRepository;