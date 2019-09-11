var Sequelize = require('sequelize');

let sequelize = new Sequelize('letreca_db', 'root', 'password', {
    host: 'letreca_db',
    port: 3306,
    dialect: 'mysql'
})

module.exports = sequelize;