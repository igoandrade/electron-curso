const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainTemplateMenu = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo Produto',
                click() {
                    createNewProductWindow()
                }
            },
            {
                label: 'Excluir Produtos',
                click() {
                    mainWindow.webContents.send('produto:excluir')
                }
            },
            {
                label: 'Sair',
                accelerator: 'CommandOrControl + Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

let newProductTemplateMenu = [];

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        width: 400,
        height: 200,
        title: 'Adicionar Novo Produto'
    });

    newProductWindow.loadFile('./html/novo-produto.html');

    newProductWindow.on('close', function() {
        newProductWindow = null;
    });

    let newProductMenu = Menu.buildFromTemplate(newProductTemplateMenu);

    newProductWindow.setMenu(newProductMenu);
}

let mainWindow;
let newProductWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    let mainMenu = Menu.buildFromTemplate(mainTemplateMenu);

    mainWindow.setMenu(mainMenu);
}


app.whenReady().then(createMainWindow);