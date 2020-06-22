class News {
    constructor(headline, content) {
        this.id = new Date().getTime();
        this.headline = headline;
        this.content = content;
        this.isVisible = true;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getHeadline() {
        return this.headline;
    }

    setHeadline(headline) {
        this.headline = headline;
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        this.content = content;
    }

    getVisibility() {
        return this.isVisible;
    }

    setVisibility(visibility) {
        this.isVisible = visibility;
    }

    json() {
        return {
            id: this.getId(),
            headline: this.getHeadline(),
            content: this.getContent(),
            isVisible: this.getVisibility()
        };
    }
}

module.exports = News;