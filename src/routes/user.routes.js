require('dotenv').config()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controllers');

//Credenciais
const SECRET = process.env.SECRET

// Functions
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
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

router.post('/', checkToken, userController.add);
router.get('/',  checkToken, userController.find);
router.get('/:id', checkToken, userController.findById);
router.put('/:id', checkToken, userController.update);
router.delete('/:id', checkToken, userController.deleteById);

module.exports = router;