const dataBase = require('./js/db');

class ManagePersons {
    constructor() {
        this.formNewRecord = document.getElementById('formNovoRegistro');
        this.records = document.getElementById('registros');
        this.name = document.getElementById('nome');
        this.username = document.getElementById('usuario');
        this.email = document.getElementById('email');
        this.btnCreateRecord = document.getElementById('btnCriarRegistro');

        this.loadPersonRecords();
        this.addEventListners();
    }

    addEventListners() {
        this.formNewRecord.addEventListener('submit', this.createPersonRecord.bind(this));
    }

    createPersonRecord(event) {
        event.preventDefault();

        dataBase.addPerson(this.name.value, this.username.value, this.email.value);

        this.name.value = '';
        this.username.value = '';
        this.email.value = '';

        this.loadPersonRecords();
    }

    generatePersonRecordHtml(person) {
        return `<tr>
            <td>${person.name}</td>
            <td>${person.username}</td>
            <td>${person.email}</td>
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorPessoas.removePersonRecord('${person._id}')" value="Excluir"></td>
        </tr>`;
    }

    loadPersonRecords() {
        dataBase.getPersons((persons) => {
            let html = persons.map(this.generatePersonRecordHtml).join('');
            this.records.innerHTML = html;
        });
    }

    removePersonRecord(id) {
        dataBase.removePerson(id);

        this.loadPersonRecords();
    }
}

let gestorPessoas = new ManagePersons();
