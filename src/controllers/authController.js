require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {}

const app = express()


//Models
const User = require('../models/Users.model')

//Credenciais
const SECRET = process.env.SECRET

//Public Route
controller.publicGet = ((req, res) => {
    res.send('Helloooo World!')
})

// Private Route
controller.privateGet = (async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id, "-password") // o parâmetro "-password" filtra(exclui) a senha do retorno.

    if (!user) {
        return res.status(404).json({msg:"Usuário não encontrado"})
    }
    res.status(200).json({user})
});

//Register Use
controller.registerPost = (async (req, res) => {
    console.log(req.body)
    const {name, email, password, confirmpassword} = req.body

    //validation
    if (!name) {
        return res.status(422).json({message: 'O nome é obrigatório!'})
    }
    if (!email) {
        return res.status(422).json({message: 'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({message: 'A senha é obrigatória!'})
    }
    if (password !== confirmpassword) {
        return res.status(422).json({message: 'A senha não confere com a anterior'})
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email})
    if (userExists) {
        return res.status(422).json({msg: 'Por favor insira outro email'})
    }
    // Create Password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    // Create User
    const user = new User({
        name,
        email,
        password: passwordHash,
    })
    try {
        await user.save()
        res.status(201).json({ msg: "Usuário criado com sucesso!"})
    }catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            msg: "Erro no Servidor"
        })
    }

});

controller.loginPost = (async (req, res) => {
    const {email, password} = req.body

    // Validations
    if (!email) {
        return res.status(422).json({message: 'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({message: 'A senha é obrigatória!'})
    }

    // Check if user exists
    const user = await User.findOne({ email: email})
    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(404).json({msg: 'Senha Inválida'})
    }

    try {
        const token = jwt.sign(
            {
                id: user._id,
            },
            SECRET,
        )
        res.status(200).json({msg:'Autenticação realizada com sucesso', token})
    } catch (err) {
        console.log(error)
        res.status(500).json({msg:'erro'})
    }
 
})

module.exports = controller;