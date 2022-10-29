require('dotenv').config()
const express = require('express');
const mongoose= require('mongoose')
const morgan = require('morgan')
const app = express()
const port = 4000

// Parser da Requisição HTTP
app.use(express.json())

//Middleware de logs
app.use(morgan('dev'))

// Config Routers
app.use(require('../src/routers/userRouter'))


//Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.fbr24tx.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(port)
    console.log(`Example app listening on port ${port}!`)
}).catch((err) => console.log(err))