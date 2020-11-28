const { app, BrowserWindow } = require('electron');
const childProcess = require('child_process');

startServer(err => {
  if (err) console.error(err);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function startServer(callback) {
  const process = childProcess.fork('./index.js');
  let invoked = false;

  process.on('error', err => {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  process.on('exit', code => {
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
}

function createWindow () {
  const window = new BrowserWindow({
    width: 960,
    height: 540,
    icon: `${__dirname}/public/icons/favicon.ico`,
    title: 'Jungschar Infoscreen',
    autoHideMenuBar: true,
    fullscreenable: true,
    fullscreenWindowTitle: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  console.log(`${__dirname}/public/icons/favicon.ico`);
  window.loadURL('http://localhost:3000/');
}