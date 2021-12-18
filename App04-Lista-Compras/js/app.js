const {  ipcRenderer } = require('electron');

ipcRenderer.on('produto:adicionar', function(evento, produto) {
    let novoProdutoHtml = `<div class="list-group-item">${produto}</div>`;

    let listaCompras = document.querySelector('#listaCompras');
});