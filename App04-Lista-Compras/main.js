const { app, BrowserWindown, Menu, ipcMain } = require('electron');

let mainWindow;
let newProductWindow;

function createMainWindow() {
    mainWindow = new BrowserWindown({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
}