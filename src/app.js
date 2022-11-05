require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const db = require('./database/db'); //Database Connection
const app = express()

// Parser da Requisição HTTP
app.use(express.json())

//Middleware de logs
app.use(morgan('dev'))

// Config Routers
app.use('/user', require('./routes/user.routes'))

//Credenciais
const PORT = process.env.PORT;

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));