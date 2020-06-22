const fs = require('fs');
const News = require('../model/News');

class NewsRepository {
    add(news) {
        const currentFile = require('../data/news.json');
        
        currentFile.push(news.json());

        fs.writeFile('./data/news.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err)
            }
        });
    }

    update(news) {

        newsList[newsList.findIndex(r => r.id === news.id)] = news;

        fs.writeFile('./data/news.json', JSON.stringify(newsList), err => {
            if (err) {
                console.error(err);
    }

    delete(news) {

    }

    deleteAll() {
        fs.writeFile('./data/news.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err)
            }
        });
    }

    async getAll() {
        const newsList = require('../data/news.json');
        const response = [];

        for (const news of newsList) {
            const newNews = new News(news.headline, news.content);
            newNews.setId(news.id);
            newNews.setVisibility(news.isVisible);

            response.push(newNews);
        }

        return response;
    }
}

module.exports = NewsRepository;