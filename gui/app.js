const { app, ipcMain } = require('electron');
const Actions = require('./actions');
const Window = require('./window');
const { autoUpdater } = require('electron-updater');


class App {
    constructor() {
        this.mainWindow = null;
        this.actions = new Actions();

        app.on('ready', this.ready.bind(this));
        app.on('window-all-closed', () => {
            app.quit();
        });

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
    }

    ready() {
        this.mainWindow = new Window({
            file: './gui/pages/index/index.html'
        });

        this.actions.init(this.mainWindow);
    }
}

module.exports = App;


