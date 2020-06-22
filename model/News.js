class News {
    constructor(headline, content) {
        this.id = new Date().getTime();
        this.headline = headline;
        this.content = content;
        this.isVisible = true;
    }
}

module.exports = News;