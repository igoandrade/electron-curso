var Datastore = require('nedb');

let db = new Datastore({filename: 'db/pessoas.db', autoload: true});

exports.addPerson = function(name, username, email) {
    var person = {
        name: name,
        username: username,
        email: email
    };
    db.insert(person, function(error, newOnject) {

    });
};

exports.getPersons = function(operation) {
    db.find({}, function(error, persons) {
        if (persons) {
            operation(persons);
        }
    });
};

exports.removePerson = function(id) {
    db.remove({_id: id}, -{}, function(error, numberofRecordsRemoved) {

    });
};