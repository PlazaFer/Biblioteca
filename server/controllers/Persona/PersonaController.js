const Persona = require("../../models/Persona");
const Libro = require("../../models/Libro");


exports.TraerPersonas = async (req, res) => {
    try{
        const respuesta = await Persona.findAll();
        res.send({respuesta: respuesta});
    }
    catch(e){
        res.status(413).send(e.message)
    }
};

exports.PersonaId = async (req, res) => {
    try{
        const respuesta = await Persona.findOne({
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

exports.CrearPersona = async (req, res) => {
    try{
        const {nombre, apellido, mail, alias} = req.body;

        if (
			!nombre ||
			!apellido ||
			!mail ||
			!alias
		){
			throw new Error(
				'Todos los datos son obligatorios para registrar a una persona'
			)
		}

        let respuesta = await Persona.findOne({
            where: {
                mail: req.body.mail,
                alias: req.body.alias
            }
        })
        

        if (respuesta) {
			throw new Error(
				'Ya se encuentra registrado con el mismo email o alias otro usuario, por favor verificar los datos.'
			)
		}
        
        await Persona.create({nombre, apellido, mail, alias});
        res.send(`Se agrego Correctamente a la persona ${nombre} ${apellido}`)
    }
    catch(e){
        res.status(413).send(e.message)
    }
};


exports.editarPersona = async (req, res) => {
    try{
        const {nombre, apellido, alias} = req.body;
        if (
			!nombre ||
			!apellido ||
			!alias
		){
			throw new Error(
				'Todos los datos son obligatorios para editar a una persona'
			)
		}

        let respuesta = await Persona.findOne({
            where: {
                alias: req.body.alias
            }
        })

        if(respuesta){
            throw new Error(`Ya se encuentra registrada una persona con el Alias ${req.body.alias}`)
        }

        await Persona.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            alias: req.body.alias
        },
        {where: {
            id: req.params.id
        }}
        )
        res.send(`Se actualizo satisfactoriamente la persona`)
    }
    catch(e){
        res.status(413).send(e.message)
    }
};

exports.BorrarPersonas = async (req, res) =>{
    try{
        let respuesta = await Libro.findOne({
            where: {
                id_persona: req.params.id
            }
        });
        
        console.log(respuesta);

        if(respuesta){
            throw new Error('No podemos eliminar la persona, tiene libros prestados')

        }else{
            await Persona.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send("Se elimino correctamente a la persona")
        } 
    }
    catch(e){
        res.status(413).send(e.message)
    }
}