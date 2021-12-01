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

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) {
        criarJanelaPrincipal();
    }
});