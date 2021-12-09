const Sequelize = require('sequelize');
const db = require("../config/db");


const Libro = db.define('libro', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : {
        type : Sequelize.STRING
    },
    descripcion : {
        type : Sequelize.STRING
    },
    id_genero : {
        type : Sequelize.INTEGER
    },
    id_persona : {
        type : Sequelize.INTEGER
    },


})




module.exports = Libro;