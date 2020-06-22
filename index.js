const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const schedule = require('node-schedule');

const RequestHandler = require('./controller/RequestHandler');
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

    socket.on('request news', () => {
        reqHandler.getNews().then(res => {socket.emit('news', res); });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
