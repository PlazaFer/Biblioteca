import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2' ;
import { Card } from '../../../common/Card';
import { FormWrapper } from '../../../common/Form';

const PrestarFormLibro = ({idPrestar, onClose}) => {

    const [personaPrestar, setPersonaPrestar] = useState([])
	const [libroPrestar, setLibroPrestar] = useState([])
	const [selectPersona, setSelectPersona] = useState(false)
	const [personaAPrestar, setPersonaAPrestar] = useState({})

    const handlePrestar = async () => {
		try {
			const libro = await axios.get(`http://localhost:3001/api/libros/${idPrestar}`)
			setLibroPrestar([libro.data.respuesta])
			const personas = await axios.get('http://localhost:3001/api/personas')
			setPersonaPrestar(personas.data.respuesta)
			setSelectPersona(true)
		} catch (e) {
			console.log(e.response.data)
		}
	}

    useEffect(() => {
        handlePrestar();
    }, [idPrestar])

	
    const handleChangePrestar = (e) => {
		setPersonaAPrestar({ id_persona: e.target.value })
	}

	
    const handleSubmitPrestar = async () => {
		await axios
			.put(
				`http://localhost:3001/api/libros/prestar/${libroPrestar[0].id}`,
				personaAPrestar
			)
			.then((res) => {
				Swal.fire('Prestado!', `${res.data}`, 'success')
				setTimeout(() => window.location.href = "http://localhost:3000/libros", 1300);
			})
			.catch((e) => {
				Swal.fire('Ups! No se pudo Prestar', `${e.response.data}`, 'warning')
			})
	}

    return (
        <Fragment>
            {selectPersona && (
						<FormWrapper>
						<Card.Item>
							<Card.Label>Prestar a?</Card.Label>

							<select onChange={handleChangePrestar}>
								<option selected disabled>
									--Selecciona--
								</option>
								{personaPrestar.map((persona) => (
									<option key={persona.id} value={persona.id}>
										{persona.nombre}
									</option>
								))}
							</select>
							<button 
                            className='button-primary'
                            onClick={handleSubmitPrestar}>
								Prestar Libro
							</button>
                            <button 
                            className='button-secondary' 
                            onClick={onClose}>
								Cancelar
							</button>
						</Card.Item>
						</FormWrapper>
					)}
        </Fragment>
    )
}

export default PrestarFormLibro
