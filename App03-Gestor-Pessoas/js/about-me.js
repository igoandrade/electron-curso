const shell = require('electron');


let pjson = require('./package.json');
let version = pjson.version;

let versionText = document.querySelector('#version');
versionText.innerText += version;

let author = pjson.author;
let authorText = document.querySelector('#author');
authorText.innerText += author;

let repositorio = pjson.repository.url.replace('git+', '');
let repositorioHtml = document.querySelector('#repositorio');
repositorioHtml.innerHTML += `<a href=${repositorio}>${repositorio}</a>`;


let link = document.querySelector('a');
link.addEventListener('click', (evento) => {
    if (evento.target.href) {
        evento.preventDefault();
        shell.shell.openExternal(evento.target.href);
    }
});


