const fs = require('fs');
const { promisify } = require('util');
const fetch = require('node-fetch');
const NewsRepository = require('./NewsRepository');
const JobRepository = require('./JobRepository');

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

    async getVideos() {
        const files = await promisify(fs.readdir)('./public/media/video')
        const response = [];

        for (const file of files) {
            if (file.endsWith('.mp4')) {
                response.push(file);
            }
        }

        return response;
    }

    getNews() {
        return new NewsRepository().getAll();
    }

    getJobs() {
        return new JobRepository().getAll();
    }

    async getUserSvg() {
        return await promisify(fs.readFile)('./public/icons/user.svg', 'utf8');
    }

    getCurrency() {
        return require('../data/currency.json');
    }
}

module.exports = RequestHandler;