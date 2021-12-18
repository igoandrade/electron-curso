const {  ipcRenderer, remote } = require('electron');

ipcRenderer.on('produto:adicionar', function(evento, nomeProduto) {
    localStorage.setItem(nomeProduto, nomeProduto);

    carregarListaProdutos();
});

function carregarListaProdutos() {
    // Obtém as chaves do localStorage
    let html = Object.keys(localStorage).map(k => `<div class="list-group-item">${localStorage.getItem(k)}</div>`).join('');

    document.getElementById('listaCompras').innerHTML = html;
}

document.addEventListener('keydown', (e) => {
    if (e.code == 123) {
        remote.getCurrentWindow().webContents.openDevTools();
    }
})