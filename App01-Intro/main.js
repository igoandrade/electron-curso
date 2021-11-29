const {app, BrowserWindow} = require('electron');
const path = require('path');

function criarJanelaPrincipal() {
    let janelaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaPrincipal.loadFile('index.html');
}

app.whenReady().then(criarJanelaPrincipal);