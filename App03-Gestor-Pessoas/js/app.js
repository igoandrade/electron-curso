const dataBase = require('./js/db');

class ManagePersons {
    constructor() {
        this.formNovoRegistro = document.getElementById('formNovoRegistro');

        this.loadPersonRecord();
        this.addEventListners();
    }

    addEventListners() {
        this.formNovoRegistro.addEventListener('submit', this.createPersonRecord.bind(this));
    }

    createPersonRecord() {

    }

    loadPersonRecord() {
        dataBase.getPersons(function(persons) {

        });
    }
}