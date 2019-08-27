var Sequelize = require('sequelize');

var sequelize = require("../../database/db_connect");

// CREATE TABLE DESAFIOS
const Desafio = sequelize.define('desafio', {
    contexto: Sequelize.STRING,
    nome: Sequelize.STRING,
    audio: Sequelize.STRING,
    imagem: Sequelize.STRING
})

Desafio.sync();

module.exports = Desafio;