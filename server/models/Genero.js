const Sequelize = require('sequelize');
const db = require('../config/db');


const Genero = db.define('genero', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING
    }
})

module.exports = Genero;