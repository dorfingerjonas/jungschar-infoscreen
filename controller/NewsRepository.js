const fs = require('fs');
const News = require('../model/News');

class NewsRepository {
    add(news) {

    }

    update(news) {

    }

    delete(news) {

    }

    getAll() {
        const newsList = require('../data/news.json');
        const response = [];

        for (const news of newsList) {
            const newNews = new News(news.headline, news.content)
            newNews.setId(news.id);
            newNews.setVisibility(news.isVisible);

            response.push(newNews);
        }

        return response;
    }
}

module.exports = NewsRepository;