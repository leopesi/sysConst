const CRUD = require('../controllers/crud')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

var userController = {
    add: add,
    find: find,
    findById: findById,
    update: update,
    deleteById: deleteById
}

//Register User
async function add(req, res) {
    const {nome, sobrenome, cpf, email, telefone, endereço, numero, estado, cidade, bairro, rua, cep, password, confirmpassword} = req.body

    //validation
    if (!nome) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!sobrenome) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!cpf) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!email) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!telefone) {
        return res.status(422).json({message: 'Se requiere el nombre!'})
    }
    if (!estado) {
        return res.status(422).json({message: 'Se requiere el apellido!'})
    }
    if (!cidade) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (!bairro) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (!rua) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (!numero) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (!cep) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (!password) {
        return res.status(422).json({message: 'La contraseña es obligatoria!'})
    }
    if (password !== confirmpassword) {
        return res.status(422).json({message: 'La confirmación de la contraseña es obligatoria'})
    }

    // Check if user exists
    const userExists = await User.findOne({ where:{ email: email}})
    if (userExists) {
        return res.status(422).json({msg: 'El usuario ya existe, registre otro email'})
    }
    // Create Password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    // Create User
    const user = new User({
        nome,
        sobrenome,
        cpf,
        email,
        telefone,
        endereço,
        numero,
        estado,
        cidade,
        bairro,
        rua,
        cep, 
        password: passwordHash,
    })
    try {
        await user.save()
        res.status(201).json({ msg: "Usuario creado con éxito!"})
        console.log("Usuário Criado!")
    }catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: "Error del Servidor"
        })
    }

};

async function find(req, res) {
    CRUD.findAll().

    then((data) => {
            res.send(data),
            console.log("Lista de Usuários encontrada!");
        })
        .catch((error) => {
            console.log(error);
        });
}

async function findById(req, res) { 
    const id = req.params.id
    const user = await CRUD.findById(id); 
    if (!user) {
        return res.status(404).json({msg:"Usuário não encontrado"})
    }
    res.status(200).json({ user: user })
    console.log("Usuário encontrado!")
};

async function update(req, res) {
    const {nome, sobrenome, cpf, email, telefone, endereço, numero, estado, cidade, bairro, rua, cep, password, confirmpassword} = req.body
    var user = {
        nome, 
        sobrenome, 
        cpf, 
        email, 
        telefone, 
        endereço, 
        numero, 
        estado, 
        cidade, 
        bairro, 
        rua, 
        cep,
    };
    CRUD.update(user, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                user: user
            })
            console.log("Usuário Atualizado!")
        })
        .catch((error) => {
            console.log(error);
        });
}

async function deleteById(req, res) {
    CRUD.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                pesi: data
            })
            console.log("Usuário Deletado!")
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = userController;