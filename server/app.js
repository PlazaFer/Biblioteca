const express = require("express");
const app = express();
const routesPersona = require("./routes/Persona");
const routesGenero = require("./routes/Genero");
const routesLibro = require("./routes/Libro");
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db');

require('./models/Persona');
require("./models/Genero");
require("./models/Libro");

db.sync()
    .then(() =>{
        console.log('Conectado al servidor');
    })
    .catch((error) =>{
        console.log(error);
    })

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/", routesPersona);
app.use("/", routesGenero);
app.use("/", routesLibro);

app.listen(3001, () => {
    console.log("App corriendo en el puerto 3001")
})