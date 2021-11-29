function estabelecerVersao(idSelector, version) {
    let elemento = document.getElementById(idSelector);
    if (elemento) {
        elemento.innerText = version;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    componentes = ['node', 'chrome', 'electron'];

    for (const componente of componentes) {
        estabelecerVersao(`${componente}-version`, process.versions[componente]);
    }
});