var Sequelize = require('sequelize');

var sequelize = require("../../database/db_connect");

// CREATE TABLE CONTEXTOS
const Contexto = sequelize.define('contexto', {
    nome: Sequelize.STRING,
    imagem: Sequelize.STRING,
})

Contexto.sync();

module.exports = Contexto;