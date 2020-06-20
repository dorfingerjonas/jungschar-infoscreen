const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');

class RequestHandler {
    getTime() {
        return new Date().getTime();
    }

    async getWeather() {
        const api = require('../data/weatherapi.json');
        const url = `${api.url}?id=${api.cityId}&appid=${api.apiKey}&units=${api.units}`;

        const response = await fetch(url);
        return await response.json();
    }

    async getLogos() {
        const files = await promisify(fs.readdir)('./public/media/img/logos')
        const response = [];

        for (const file of files) {
            if (/.(jpeg|jpg|gif|png|svg)/i.test(file)) {
                response.push(file);
            }
        }

        return response;
    }
}

module.exports = RequestHandler;