const Libro = require("../../models/Libro");

const { Op } = require("sequelize");


exports.TraerLibros = async (req, res) => {
    try{
        const respuesta = await Libro.findAll();
        res.send({respuesta: respuesta});
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.librosId = async (req, res) => {
    try{
        const respuesta = await Libro.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send({respuesta: respuesta});
    }
    catch(e){
       res.status(413).send(e.message)
    }
};


exports.CrearLibro = async (req, res) => {
    try{
        const {nombre, descripcion, id_genero} = req.body;
        if(!nombre || !descripcion || !id_genero){
            throw new Error("Completar todos los campos para registrar un libro")
        };

        let respuesta = await Libro.findOne({
            where: {
                nombre: req.body.nombre
            }
        });

        if(respuesta){
            throw new Error(`Ya existe un libro con el nombre ${nombre}`)
        };

        await Libro.create({nombre, descripcion, id_genero});
        res.send(`Se registro correctamente el libro ${nombre}`);
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.EditarLibro = async (req, res) => {
    try{
        if(!req.body.descripcion){
            throw new Error("Debe ingresar la descripcion a editar.");
        };

        await Libro.update({
            descripcion: req.body.descripcion,
            },
            {where: {
                id: req.params.id
            }}
        );
        res.send("Se actualizo la descripcion correctamente");
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.PrestarLibro = async (req, res) => {    
    try{
        let respuesta = await Libro.findOne({
            where: {
                id: req.params.id,
                id_persona: {
                     [Op.is]: null
                }
            }
        });

        if(respuesta){
            await Libro.update({
                id_persona: req.body.id_persona
            },
            {where: {
                id: req.params.id
            }}   
            )
            res.send("El libro se presto correctamente")
        }

        if(!respuesta){
            throw new Error("No se puede prestar el libro")
        }
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.devolverLibro = async (req, res) => {
    try{
        let respuesta = await Libro.findOne(
            {where:{
                id: req.params.id,
                id_persona: {
                     [Op.not]: null
                }
            }}
        )
        if(respuesta){
            await Libro.update({
                id_persona: null,
            },
            {where: {
                id: req.params.id
            }}
            )
            res.send("Se devolvio el Libro a la biblioteca")
        }else{
            throw new Error("El Libro no se encuentra prestado actualmente");
        }
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.BorrarLibro = async (req, res) => {
    try{
        let respuesta = await Libro.findOne({
            where: {
                id: req.params.id,
                id_persona: {
                     [Op.not]: null
                }
            }
        })
        if(respuesta){
            throw new Error("No podemos eliminar el libro, esta prestado")

        }
        else{
            await Libro.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send("Se elimino correctamente el libro")
        }
    }
    catch(e){
        res.status(413).send(e.message)
    }
};