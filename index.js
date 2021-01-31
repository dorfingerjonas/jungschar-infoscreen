const {app, BrowserWindow} = require('electron')
const express = require('express');
const expressApp = express();
const http = require('http').createServer(expressApp);
const io = require('socket.io')(http);
const schedule = require('node-schedule');
const formidable = require('formidable');
const fs = require('fs');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1160,
    height: 740,
    autoHideMenuBar: true,
    webPreferences: {
        nodeIntegration: true
    }
  });

  mainWindow.loadURL('http://localhost:42069/');
  mainWindow.focus();
}

app.whenReady().then(() => {
  expressApp.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
});

const RequestHandler = require('./controller/RequestHandler');
const NewsRepository = require('./controller/NewsRepository');
const JobRepository = require('./controller/JobRepository');
const WeatherRepository = require('./controller/WeatherRepository');
const newsRepo = new NewsRepository();
const jobRepo = new JobRepository();
const weatherRepo = new WeatherRepository();
const reqHandler = new RequestHandler();

expressApp.use(express.static(__dirname + '/public'));
expressApp.use(express.static(__dirname + '/public/font'));
expressApp.use(express.static(__dirname + '/public/icons'));
expressApp.use(express.static(__dirname + '/public/style'));
expressApp.use(express.static(__dirname + '/public/scripts'));
expressApp.use(express.static(__dirname + '/public/media/img'));
expressApp.use(express.static(__dirname + '/public/media/video'));
expressApp.use(express.static(__dirname + '/public/presentation'));

expressApp.post('/fileupload', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (files.filetoupload !== undefined) {
            const oldPath = files.filetoupload.path;
            let newPath;
    
            if (files.filetoupload.type.includes('video')) {
                newPath = `./public/media/video/${files.filetoupload.name}`;
            } else if (files.filetoupload.type.includes('image')) {
                newPath = `./public/media/img/${files.filetoupload.name}`;
            }
    
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(err.message);
                    io.emit('uploadResult', false);
                } else {
                    io.emit('uploadResult', true);
                    res.status(204).send();
                }
            });
        } else {
            io.emit('uploadResult', false);
        }
    });
});

io.on('connection', (socket) => {
    socket.on('request time', () => {
        io.emit('time', reqHandler.getTime());
    });

    socket.on('request weather', async () => {
        schedule.scheduleJob('*/10 * * * *', async () => {
            io.emit('weather', await reqHandler.getWeather());
        });

        io.emit('weather', await reqHandler.getWeather());
    });

    socket.on('request logos', () => {
        reqHandler.getLogos().then(res => {io.emit('logos', res); });
    });

    socket.on('request videos', () => {
        reqHandler.getVideos().then(res => {io.emit('videos', res); });
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
        io.emit('user svg', await reqHandler.getUserSvg());
    });

    socket.on('request currency', async () => {
        io.emit('currency', await reqHandler.getCurrency());
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

    socket.on('update currency', async (currency) => {
        await jobRepo.updateCurrency(currency);
        socket.emit('currency updated', null);        
    });

    socket.on('get all videos', async () => {
        reqHandler.getVideos().then(res => {socket.emit('all videos', res); });
    });

    socket.on('get all images', async () => {
        reqHandler.getImages().then(res => {socket.emit('all images', res); });
    });

    socket.on('delete video', video => {
        reqHandler.deleteVideo(video);
    });

    socket.on('delete image', image => {
        reqHandler.deleteImage(image);
    });

    socket.on('get api infos', async () => {
        socket.emit('api infos', await reqHandler.getApiInfos());
    });

    socket.on('get custom weather', async () => {
        socket.emit('customWeather', await reqHandler.getCustomWeather());
    });

    socket.on('get weather icons', async () => {
        socket.emit('weather icons', await reqHandler.getWeatherIcons());
    });

    socket.on('update city', city => {
        weatherRepo.updateCity(city);
    });

    socket.on('update apiKey', key => {
        weatherRepo.updateKey(key);
    });

    socket.on('update weather state', state => {
        weatherRepo.changeCustomWeatherState(state);
    });

    socket.on('update custom weather', weather => {
        weatherRepo.updateCustomWeather(weather);
    });
    
    socket.on('presentation started', () => {
        io.emit('presentation state changed', true);
    });
});

http.listen(42069, () => {
    console.log('http://localhost:42069/');
});