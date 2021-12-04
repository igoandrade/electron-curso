const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

let menuApplicationTemplate = [
    {
        label: 'Aplicação',
        submenu: [
            {
                label: 'DevTools',
                role: 'toggleDevTools',
            },
            {
                label: 'Sobre',
                click: () => {
                    openAboutWindow();
                },
            },

        ]
    }
];

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
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
    let aboutMeWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 600,
        height: 280,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    aboutMeWindow.loadFile('about-me.html');
    aboutMeWindow.setMenu(null);
    aboutMeWindow.once('ready-to-show', () => {
        aboutMeWindow.show();
    });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createMainWindow();
});

