var Sequelize = require('sequelize');

let sequelize = new Sequelize('db_letreca', 'root', '19996_Mj', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;