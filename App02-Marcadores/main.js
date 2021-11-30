const { app, BrowserWindow } = require('electron');

function criarJanelaPrincipal() {
    let janelaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    janelaPrincipal.loadFile('index.html');
}

app.whenReady().then(criarJanelaPrincipal);