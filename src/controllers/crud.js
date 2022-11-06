const Model = require('../models/users.model');

var Crud = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    update: update
}

function findAll() {
    return Model.findAll({attributes: {exclude: ['password'] }});
}

function findById(id) {
    return Model.findByPk(id, {attributes: {exclude: ['password'] }});
}

function deleteById(id) {
    return Model.destroy({ where: { id: id } });
}

function create(user) {
    var newUser = new Model(user);
    return newUser.save();
}

function update(user, id) {
    var updateUser = {
        nome: user.nome, 
        sobrenome: user.sobrenome, 
        cpf: user.cpf, 
        email: user.email, 
        telefone: user.telefone, 
        endereço: user.endereco, 
        numero: user.numero, 
        estado: user.estado, 
        cidade: user.cidade, 
        bairro: user.bairro, 
        rua: user.rua, 
        cep: user.cep,
    };
    return Model.update(updateUser, { where: { id: id } });
}
module.exports = Crud;