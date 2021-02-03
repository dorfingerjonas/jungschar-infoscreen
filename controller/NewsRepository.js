const fs = require('fs');
const { promisify } = require('util');

const filePath = __dirname.replace('controller', 'data/news.json');

class NewsRepository {
    async add(news) {
        const currentFile = await this.getAll();

        currentFile.push(news);

        fs.writeFile(filePath, JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(news) {
        const newsList = await this.getAll();
        
        newsList[newsList.findIndex(r => r.id === news.id)] = news;

        fs.writeFile(filePath, JSON.stringify(newsList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(news) {
        const currentFile = await this.getAll();
        
        fs.writeFile(filePath, JSON.stringify(currentFile.filter(r => r.id !== news.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile(filePath, JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        const content = await promisify(fs.readFile)(filePath, 'utf8');
        return content ? JSON.parse(content) : [];
    }
}

module.exports = NewsRepository;