const fs = require('fs');
const { promisify } = require('util');

class NewsRepository {
    async add(news) {
        const currentFile = await this.getAll();

        currentFile.push(news);

        fs.writeFile('./data/news.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(news) {
        const newsList = await this.getAll();
        
        newsList[newsList.findIndex(r => r.id === news.id)] = news;

        fs.writeFile('./data/news.json', JSON.stringify(newsList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(news) {
        const currentFile = await this.getAll();
        
        fs.writeFile('./data/news.json', JSON.stringify(currentFile.filter(r => r.id !== news.id)), err => {
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

    async getAll() {
        const content = await promisify(fs.readFile)('./data/news.json', 'utf8');
        return content ? JSON.parse(content) : [];
    }
}

module.exports = NewsRepository;