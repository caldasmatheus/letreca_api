var Sequelize = require('sequelize');

let sequelize = new Sequelize('db_letreca', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;