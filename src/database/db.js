require('dotenv').config()
const { Sequelize } = require('sequelize');

//Credenciais
const DB_DATABASE = process.env.DB_DATABASE
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;