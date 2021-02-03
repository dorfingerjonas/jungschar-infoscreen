const fs = require('fs');
const { promisify } = require('util');

const jobsFilePath = __dirname.replace('controller', 'data/jobs.json');
const currencyFilePath = __dirname.replace('controller', 'data/currency.json');

class JobRepository {
   async add(job) {
        const currentFile = await this.getAll();

        job.id = Date.now();

        currentFile.push(job);

        fs.writeFile(jobsFilePath, JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async update(job) {
        const jobList = await this.getAll();
        
        jobList[jobList.findIndex(r => r.id === job.id)] = job;

        fs.writeFile(jobsFilePath, JSON.stringify(jobList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async delete(job) {
        const currentFile = await this.getAll();

        fs.writeFile(jobsFilePath, JSON.stringify(currentFile.filter(r => r.id !== job.id)), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    deleteAll() {
        fs.writeFile(jobsFilePath, JSON.stringify([]), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    async getAll() {
        const content = await promisify(fs.readFile)(jobsFilePath, 'utf8');
        return content ? JSON.parse(content) : [];
    }

    async getCurrency() {
        const content = await promisify(fs.readFile)(currencyFilePath, 'utf8');
        return content ? JSON.parse(content) : [];
    }

    async updateCurrency(currency) {
        await promisify(fs.writeFile)(currencyFilePath, JSON.stringify(currency), err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

module.exports = JobRepository;