const Genero = require("../../models/Genero");
const Libro = require("../../models/Libro");


exports.TraerGeneros = async (req, res) => {
    try{
        const respuesta = await Genero.findAll();
        res.send({respuesta: respuesta});
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.GenerosId = async (req, res) => {
    try{
        const respuesta = await Genero.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send({respuesta: respuesta})

    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.CrearGenero = async (req, res) => {
    try{
        const {nombre} = req.body;
        if(!nombre){
            throw new Error("Debe ingresar el nombre de la categoria")
        };

        let respuesta = await Genero.findOne({
            where: {
                nombre: req.body.nombre
            }
        });

        if(respuesta){
            throw new Error(`Ya existe una categoria con el nombre ${req.body.nombre}`)
        };

        await Genero.create({nombre});
        res.send(`Se agrego correctamente la categoria ${nombre}`)


    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.EliminarGenero = async (req, res) => {
    try{
        let respuesta = await Libro.findOne({
            where: {
                id_genero: req.params.id
            }
        });
        
        if(respuesta){
            throw new Error("No podemos eliminar el genero, tiene libros asociados")
        }
    
    await Genero.destroy({
            where: {
                id: req.params.id
            }
        });

        res.send("Se elimino correctamente el genero");
    
    }   
    catch(e){
        res.status(413).send(e.message)
    }
};
