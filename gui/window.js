const { BrowserWindow, Menu } = require('electron');
const menu = require('./menu');
const { autoUpdater } = require('electron-updater');

const defaultProps = {
    with: 1224,
    height: 700,
    show: false,
    resizable: false,
    frame: false,
    blur: false,
    webPreferences: {
        nodeIntegration: true,
        devTools: false,
        contextIsolation: false,
        enableRemoteModule: true,
    },
}



class Window extends BrowserWindow {
    constructor({file, ...windowSettings}) {
        super({ ...defaultProps, ...windowSettings});

        this.homeFile = file;

        this.loadFile(file)

        Menu.setApplicationMenu(null);

        this.webContents.openDevTools();

        this.once('ready-to-show', () => {
            autoUpdater.checkForUpdatesAndNotify();  this.show();
        });
    }

    goToHome() {
        this.loadFile(this.homeFile);
    }
}

module.exports = Window;