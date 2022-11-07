require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Models
const User = require('../models/users.model')

//Credenciais
const SECRET = process.env.SECRET

var authController = {
    login: login,
    //logout: logout,
}

async function login(req, res) {
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
 
}

module.exports = authController;