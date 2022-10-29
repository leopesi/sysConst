require('dotenv').config()
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

//Credenciais
const SECRET = process.env.SECRET

// Functions
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({msg: 'Acesso negado!'})
    }
    try {
        jwt.verify(token, SECRET)
        next()
    } catch(error){
        res.status(400).json({msg: "Token Inválido"})
    }
}

//Open Route - Public Route
router.get('/', authController.publicGet)

//Register Use
router.post('/auth/register', authController.registerPost)

// Login User
router.post('/auth/login', authController.loginPost)

// CRUD User
router.get('/usuario/',  userController.getList);
router.get('/usuario/:id/', checkToken, userController.getId );
router.post('/usuario/create/', userController.post);
router.put('/usuario/:id/', userController.put);
router.delete('/usuario/:id/', userController.delete);

module.exports = router