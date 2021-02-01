const Datastore = require('nedb');
const db = new Datastore({
    filename: __dirname.replace('controller', 'data/news.db'),
    autoload: true
});

class NewsRepository {
    async add(news) {
        db.insert(news);
    }

    async update(news) {
        db.update({
            _id: news._id
        }, news);
    }

    async delete(news) {
        db.remove({
            _id: news._id
        });
    }

    deleteAll() {
        db.remove({}, {
            multi: true
        });
    }

    async getAll() {
        return db.getAllData() || [];
    }
}

module.exports = NewsRepository;