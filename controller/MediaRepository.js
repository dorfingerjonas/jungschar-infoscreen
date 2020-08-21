const fs = require('fs');
const { promisify } = require('util');

class MediaRepository {
    async deleteVideo(filename) {
        fs.unlink(`./public/media/video/${filename}`);
    }

    async deleteImage(filename) {
        fs.unlink(`./public/media/img/${filename}`);
    }

    async getAllVideos() {
        const files = await promisify(fs.readdir)('./public/media/video');
        const response = [];

        for (const file of files) {
            if (file.endsWith('.mp4') || file.endsWith('.m4v')) {
                response.push(file);
            }
        }

        return response;
    }

    async getAllImages() {
        const files = await promisify(fs.readdir)('./public/media/img');
        const response = [];

        for (const file of files) {
            if (file.endsWith('.mp4') || file.endsWith('.m4v')) {
                response.push(file);
            }
        }

        return response;
    }
}

module.exports = MediaRepository;