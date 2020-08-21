const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');
const NewsRepository = require('./NewsRepository');
const JobRepository = require('./JobRepository');
const WeatherRepository = require('./WeatherRepository');

class RequestHandler {
    getTime() {
        return new Date().getTime();
    }

    async getWeather() {
        const customWeather = await this.getCustomWeather();

        if (customWeather.active) {
            return customWeather;
        } else {
            const api = JSON.parse(await promisify(fs.readFile)('./data/weatherapi.json', 'utf8'));
            const url = `${api.url}?q=${api.city}&appid=${api.apiKey}&units=${api.units}`;
    
            const response = await fetch(url);
            const weather = await response.json();

            return {
                temp: weather.main.temp,
                minTemp: weather.main.temp_min,
                maxTemp: weather.main.temp_max,
                speed: weather.wind.speed,
                pressure: weather.main.pressure,
                humidity: weather.main.humidity,
                icon: weather.weather[0].icon
            }
        }
    }

    async getLogos() {
        const files = await promisify(fs.readdir)('./public/media/img');
        const response = [];

        for (const file of files) {
            if (/.(jpeg|jpg|jfif|pjpeg|pjp|gif|png|svg)/i.test(file)) {
                response.push(file);
            }
        }

        return response;
    }

    async deleteVideo(filename) {
        fs.unlink(`./public/media/video/${filename}`, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getVideos() {
        const files = await promisify(fs.readdir)('./public/media/video')
        const response = [];

        for (const file of files) {
            if (file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.m4v')) {
                response.push(file);
            }
        }

        return response;
    }

    async getNews() {
        return await new NewsRepository().getAll();
    }

    async getJobs() {
        return await new JobRepository().getAll();
    }

    async getUserSvg() {
        return await promisify(fs.readFile)('./public/icons/user.svg', 'utf8');
    }

    async getCurrency() {
        return await promisify(fs.readFile)('./data/currency.json', 'utf8');
    }

    async getCheckSvg() {
        return await promisify(fs.readFile)('./public/icons/check.svg', 'utf8');
    }

    async getCrossSvg() {
        return await promisify(fs.readFile)('./public/icons/cross.svg', 'utf8');
    }

    async getApiInfos() {
        return await new WeatherRepository().getJSON();
    }

    async getCustomWeather() {
        return await new WeatherRepository().getCustomJSON();
    }

    async getWeatherIcons() {
        return await new WeatherRepository().getAllIcons();
    }
}

module.exports = RequestHandler;