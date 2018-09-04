const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
// import electron from 'electron';

//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

// app.on('ready', function() {
//  console.log(electron);
// });
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (error, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
        //console.log(`File duration is: ${metadata.format.duration} minutes`);
    });
});