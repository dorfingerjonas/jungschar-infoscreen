const fs = require('fs');
const Job = require('../model/Job');

class JobRepository {
    add(job) {
        const currentFile = require('../data/jobs.json');

        currentFile.push(job);

        fs.writeFile('./data/jobs.json', JSON.stringify(currentFile), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    update(job) {
        const jobList = this.getAll();
        
        jobList[jobList.findIndex(r => r.id === job.id)] = job;

        fs.writeFile('./data/jobs.json', JSON.stringify(jobList), err => {
            if (err) {
                console.error(err);
            }
        });
    }

    delete(job) {
        fs.writeFile('./data/jobs.json', JSON.stringify(this.getAll().filter(r => r.id !== job.id)), err => {
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

    getAll() {
        const jobList = require('../data/jobs.json');
        const response = [];

        for (const job of jobList) {
            const newJob = new Job(job.name, job.salary, job.amount, job.morning, job.afternoon);
            newJob.id = job.id;
            newJob.visible = job.visible;

            response.push(newJob);
        }

        return response;
    }
}

module.exports = JobRepository;