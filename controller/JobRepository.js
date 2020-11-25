const fs = require('fs');
const { promisify } = require('util');

class JobRepository {
   async add(job) {
        const currentFile = await this.getAll();

        job.id = Date.now();

        currentFile.push(job);

        fs.writeFile('./data/jobs.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(job) {
        const jobList = await this.getAll();
        
        jobList[jobList.findIndex(r => r.id === job.id)] = job;

        fs.writeFile('./data/jobs.json', JSON.stringify(jobList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(job) {
        const currentFile = await this.getAll();

        fs.writeFile('./data/jobs.json', JSON.stringify(currentFile.filter(r => r.id !== job.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile('./data/jobs.json', JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        const content = await promisify(fs.readFile)('./data/jobs.json', 'utf8');
        return content ? JSON.parse(content) : [];
    }

    async updateCurrency(currency) {
        await promisify(fs.writeFile)('./data/currency.json', JSON.stringify(currency), err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

module.exports = JobRepository;