const Sequelize = require('sequelize');
const db = require('../config/db');


const Persona = db.define('persona', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING
    },
    apellido : {
        type : Sequelize.STRING
    },
    mail : {
        type : Sequelize.STRING
    },
    alias : {
        type : Sequelize.STRING
    },
})

module.exports = Persona;