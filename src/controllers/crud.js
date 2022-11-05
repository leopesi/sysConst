const Model = require('../models/users.model');

var Crud = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    update: update
}

function findAll() {
    return Model.findAll();
}

function findById(id) {
    return Model.findByPk(id);
}

function deleteById(id) {
    return Model.destroy({ where: { id: id } });
}

function create(user) {
    var newUser = new Pesi(user);
    return newUser.save();
}

function update(user, id) {
    var updateUser = {
        title: user.title,
        technologies: pesi.technologies,
        description: pesi.description,
        budget: pesi.budget,
        contact_email: pesi.contact_email
    };
    return Pesi.update(updatePesi, { where: { id: id } });
}
module.exports = Crud;