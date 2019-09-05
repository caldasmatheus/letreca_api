var Sequelize = require('sequelize');
var sequelize = require("../../database/db_connect");

//CREATE TABLE USUARIOS
const Usuarios = sequelize.define('usuarios', {
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: Sequelize.STRING,
})

Usuarios.sync();
module.exports = Usuarios;