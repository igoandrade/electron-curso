const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

let menuApplicationTemplate = [
    {
        label: 'Aplicação',
        submenu: [
            {
                label: 'Sobre',
                click: () => {
                    openAboutWindow();
                }
            }
        ]
    }
];

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('index.html');

    let menu = new Menu.buildFromTemplate(menuApplicationTemplate);
    mainWindow.setMenu(menu);

    mainWindow.on('close', () => {
        mainWindow = null;
    })
}

function openAboutWindow() {

}

app.whenReady().then(createMainWindow);

