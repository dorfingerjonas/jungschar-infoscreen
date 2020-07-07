const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const schedule = require('node-schedule');

const RequestHandler = require('./controller/RequestHandler');
const NewsRepository = require('./controller/NewsRepository');
const JobRepository = require('./controller/JobRepository');
const newsRepo = new NewsRepository();
const jobRepo = new JobRepository();
const reqHandler = new RequestHandler();

app.use(express.static('public'));
app.use(express.static('public/font'));
app.use(express.static('public/icons'));
app.use(express.static('public/style'));
app.use(express.static('public/scripts'));
app.use(express.static('public/media/img'));
app.use(express.static('public/media/video'));
app.use(express.static('public/presentation'));

io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('request time', () => {
        socket.emit('time', reqHandler.getTime());
    });

    socket.on('request weather', async () => {
        schedule.scheduleJob("*/10 * * * *", async () => {
            socket.emit('weather', await reqHandler.getWeather());
        });

        socket.emit('weather', await reqHandler.getWeather());
    });

    socket.on('request logos', () => {
        reqHandler.getLogos().then(res => {socket.emit('logos', res); });
    });

    socket.on('request videos', () => {
        reqHandler.getVideos().then(res => {socket.emit('videos', res); });
    });

    socket.on('request news', async () => {
        io.emit('news', await reqHandler.getNews());
    });
    
    socket.on('request jobs', async () => {
        io.emit('jobs', await reqHandler.getJobs());
    });

    socket.on('request mode change', data => {
        io.emit('mode', data);
    });

    socket.on('request user svg', async () => {
        socket.emit('user svg', await reqHandler.getUserSvg());
    });

    socket.on('request currency', () => {
        socket.emit('currency', reqHandler.getCurrency());
    });

    socket.on('get all news', async () => {
        socket.emit('all news', await reqHandler.getNews());
    });

    socket.on('request check svg', async () => {
        socket.emit('check svg', await reqHandler.getCheckSvg());
    });

    socket.on('request cross svg', async () => {
        socket.emit('cross svg', await reqHandler.getCrossSvg());
    });

    socket.on('update news', news => {
        newsRepo.update(news);
    });
    
    socket.on('delete news', news => {
        newsRepo.delete(news);
    });

    socket.on('news delete all', () => {
        newsRepo.deleteAll();
    });

    socket.on('add news', news => {
        newsRepo.add(news);
    });

    socket.on('get all jobs', async () => {
        socket.emit('all jobs', await reqHandler.getJobs());
    });

    socket.on('update job', job => {
        jobRepo.update(job);
    });
    
    socket.on('delete job', job => {
        jobRepo.delete(job);
    });

    socket.on('job delete all', () => {
        jobRepo.deleteAll();
    });

    socket.on('add job', job => {
        jobRepo.add(job);
    });

    socket.on('select job', job => {
        io.emit('select workplace', job);
    });

    socket.on('deselect job', job => {
        io.emit('deselect workplace', job);
    });
});

http.listen(3000, () => {
    console.log('http://localhost:3000/');
});
