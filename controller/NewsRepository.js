const fs = require('fs');
const News = require('../model/News');

class NewsRepository {
    add(news) {
        const currentFile = require('../data/news.json');

        currentFile.push(news);

        fs.writeFile('./data/news.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    update(news) {
        const newsList = this.getAll();
        
        newsList[newsList.findIndex(r => r.id === news.id)] = news;

        fs.writeFile('./data/news.json', JSON.stringify(newsList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    delete(news) {
        fs.writeFile('./data/news.json', JSON.stringify(this.getAll().filter(r => r.id !== news.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/news.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    getAll() {
        const newsList = require('../data/news.json');
        const response = [];

        for (const news of newsList) {
            const newNews = new News(news.headline, news.content);
            newNews.id = news.id;
            newNews.isVisible = news.isVisible;

            response.push(newNews);
        }

        return response;
    }
}

module.exports = NewsRepository;