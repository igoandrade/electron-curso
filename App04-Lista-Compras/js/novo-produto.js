const { ipcRenderer } = require('electron');

function adicionarProduto(evento) {
    evento.preventDefault();

    let nomeProduto = document.querySelector('#nomeProduto').value;

    if (nomeProduto) {
        ipcRenderer.send('produto:adicionar', nomeProduto)
    }

}

document.querySelector('#formAddProduct').addEventListener('submit', adicionarProduto);