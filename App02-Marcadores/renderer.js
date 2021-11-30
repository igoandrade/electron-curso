const shell = require('electron');

class Marcadores {
    constructor () {
        this.msgError = document.querySelector('.msg-error');
        this.marcadorUrl = document.querySelector('.criacao-marcador-url');
        this.marcadorBtn = document.querySelector('.criacao-marcador-btn');
        this.formCriacaoMarcadores = document.querySelector('.criacao-marcador-formulario');
        this.marcadores = document.querySelector('.marcadores');
        this.removerMarcadores = document.querySelector('.remover-marcadores');

        this.parser = new DOMParser();

        this.agregarEventListeners();
    }
    agregarEventListeners(){
        this.marcadorUrl.addEventListener('keyup', () => {
            this.marcadorBtn.disabled = !this.marcadorUrl.validity.valid;
        });

        this.formCriacaoMarcadores.addEventListener('submit', this.criarMarcador.bind(this));

        this.removerMarcadores.addEventListener('click', this.removerMarcadoresCriados.bind(this));

        this.marcadores.addEventListener('click', this.abrirEnlaceMarcador.bind(this));
    }

    criarMarcador(evento) {
        evento.preventDefault();
        const url = this.marcadorUrl.value;

        fetch(url)
        .then(resposta => resposta.text())
        .then(this.extrairConteudo.bind(this))
        .then(this.encontrarTituloPagina)
        .then(titulo => this.armazenarMarcador(url, titulo))
        .then(this.limparFormulario.bind(this))
        .then(this.visualizarMarcadores.bind(this))
        .catch(error => this.reportarError(error, url))
    }

    extrairConteudo(conteudo) {
        return this.parser.parseFromString(conteudo, 'text/html');
    }

    encontrarTituloPagina(html) {
        return html.querySelector('title').innerText;
    }

    armazenarMarcador(url, titulo) {
        localStorage.setItem(url, JSON.stringify({titulo:titulo, url:url}));
    }

    limparFormulario() {
        this.marcadorUrl.value = null;
    }

    obterMarcadores() {
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }

    gerarMarcadorHtml(marcador) {
        return `<div class="enlace"><h3>${marcador.titulo}</h3>
        <p><a href="${marcador.url}">${marcador.url}</a></p></div>`;
    }

    visualizarMarcadores() {
        let marcadores = this.obterMarcadores();

        let html = marcadores.map(this.gerarMarcadorHtml).join('');

        this.marcadores.innerHTML = html;  
    }

    reportarError(error, url) {
        this.msgError.innerHTML = `Ocorreu um erro ao tentar acessar a url <strong>${url}</strong>: ${error}`;

        setTimeout(() => {
            this.msgError.innerHTML = null;
        }, 5000);
    }

    removerMarcadoresCriados() {
        localStorage.clear();
        this.marcadores.innerHTML = '';
    }

    abrirEnlaceMarcador(evento) {
        if (evento.target.href) {
            evento.preventDefault();
            shell.shell.openExternal(evento.target.href);
        }
    }
}

let marcadores = new Marcadores();
marcadores.visualizarMarcadores();