const fetch = require('node-fetch');
const NewsRepository = require('./NewsRepository');
const JobRepository = require('./JobRepository');
const WeatherRepository = require('./WeatherRepository');
const MediaRepository = require('./MediaRepository');

class RequestHandler {
    getTime() {
        return new Date().getTime();
    }

    async getWeather() {
        const customWeather = await this.getCustomWeather();

        if (customWeather.active) {
            customWeather.code = 200;

            return customWeather;
        } else {
            const api = await new WeatherRepository().getJSON();
            const url = `${api.url}?q=${api.city}&appid=${api.apiKey}&units=${api.units}`;

            const response = await fetch(url);
            const weather = await response.json();

            if (weather.cod !== 200) {
                if (weather.message.includes('Invalid API key.')) {
                    return {
                        code: weather.cod,
                        message: 'Ungültiger API Key. Bitte überprüfen Sie den Key in den Wetter Einstellungen.'
                    }
                } else if (weather.message.includes('city not found')) {
                    return {
                        code: weather.cod,
                        message: 'Stadt konnte nicht gefunden werden. Bitte überprüfen Sie die Stadt in den Wetter Einstellungen.'
                    }
                }
            } else {
                return {
                    code: weather.cod,
                    temp: weather.main.temp,
                    minTemp: weather.main.temp_min,
                    maxTemp: weather.main.temp_max,
                    speed: weather.wind.speed,
                    pressure: weather.main.pressure,
                    humidity: weather.main.humidity,
                    icon: weather.weather[0].icon
                };
            }
        }
    }

    async getLogos() {
        return await new MediaRepository().getLogos();
    }

    async deleteVideo(filename) {
        await new MediaRepository().deleteVideo(filename);
    }

    async deleteImage(filename) {
        await new MediaRepository().deleteImage(filename);
    }

    async getImages() {
        return await new MediaRepository().getImages();
    }

    async getVideos() {
        return await new MediaRepository().getVideos();
    }

    async getNews() {
        return await new NewsRepository().getAll();
    }

    async getJobs() {
        return await new JobRepository().getAll();
    }

    async getUserSvg() {
        return await new MediaRepository().getUserSvg();
    }

    async getCurrency() {
        return await new JobRepository().getCurrency();
    }

    async getCheckSvg() {
        return await new MediaRepository().getCheckSvg();
    }

    async getCrossSvg() {
        return await new MediaRepository().getCrossSvg();
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
