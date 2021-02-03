const fs = require('fs');
const { promisify } = require('util');

class MediaRepository {
    async getLogos() {
        const files = await promisify(fs.readdir)(__dirname.replace('controller', 'public/media/img'));
        const response = [];

        for (const file of files) {
            if (/.(jpeg|jpg|jfif|pjpeg|pjp|gif|png|svg)/i.test(file)) {
                response.push(file);
            }
        }

        return response;
    }

    async deleteVideo(filename) {
        fs.unlink(__dirname.replace('controller', `public/media/video/${filename}`), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async deleteImage(filename) {
        fs.unlink(__dirname.replace('controller', `public/media/img/${filename}`), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getImages() {
        const files = await promisify(fs.readdir)(__dirname.replace('controller', 'public/media/img'));
        const response = [];

        for (const file of files) {
            response.push(file);
        }

        return response;
    }

    async getVideos() {
        const files = await promisify(fs.readdir)(__dirname.replace('controller', 'public/media/video'));
        const response = [];

        for (const file of files) {
            if (file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.m4v')) {
                response.push(file);
            }
        }

        return response;
    }

    async getUserSvg() {
        return await promisify(fs.readFile)(__dirname.replace('controller', 'public/icons/user.svg'), 'utf8');
    }

    async getCheckSvg() {
        return await promisify(fs.readFile)(__dirname.replace('controller', 'public/icons/check.svg'), 'utf8');
    }

    async getCrossSvg() {
        return await promisify(fs.readFile)(__dirname.replace('controller', 'public/icons/cross.svg'), 'utf8');
    }
}

module.exports = MediaRepository;