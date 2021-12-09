import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { EditFormPersona } from './EditFormPersona'
import { GridCards, Card } from '../../../common/Card'
import { Section } from '../../../common/Section'
import { SearchDiv } from '../../../common/Search';
import Personas from '../../../assets/personas-red.svg'

export const ListadoPersonas = () => {
	const [personas, setPersonas] = useState([])
	const [showEditForm, setShowEditForm] = useState(false)
	const [personaEditar, setPersonaEditar] = useState([
		{
			nombre: '',
			apellido: '',
			alias: '',
		}
	])

	const [personasearch, setPersonasearch] = useState();
	

	const params = useParams()

	const traerPersonas = async () => {
		const resultadoPersonas = await axios.get('http://localhost:3001/api/personas');
		const resultadoLibros = await axios.get('http://localhost:3001/api/libros');
		const libro = resultadoPersonas.data.respuesta.map(unaPersona => {
			const libroAsociado = resultadoLibros.data.respuesta.filter(unLibro => 
				unLibro.id_persona === unaPersona.id)
				unaPersona.libro = libroAsociado
			return unaPersona
		})
		setPersonas(libro)
		setPersonasearch(libro)
	}

	useEffect(() => {
		traerPersonas()
	}, [])

	

	const handleEdit = async (id) => {
		await axios
			.get(`http://localhost:3001/api/personas/${id}`)
			.then(
				(res) => setPersonaEditar([res.data.respuesta]),
				setShowEditForm(true)
			)
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params])

	const handleDelete = (id) => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Una vez eliminado no se puede recuperar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borrar!',
			cancelButtonText: 'No, Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteConfirm(id)
			} else {
				return
			}
		})
	}

	const deleteConfirm = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/api/personas/${id}`)
			Swal.fire(
				'Eliminado!',
				'La persona fue eliminada correctamente',
				'success'
			)
			setTimeout(() => window.location.href = "http://localhost:3000/personas", 1300);
		} catch (e) {
			return Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	};

	const handleChangeSearch = (e) => {
		const persona = personas.filter(unaPersona => unaPersona.nombre.includes(e.target.value))
		setPersonasearch(persona);
	}

	return (
		<>
			{showEditForm && (
				<Section className='section-form'>
					<EditFormPersona
						personaEditar={personaEditar}
						onClose={() => setShowEditForm(false)}
					/>
				</Section>
			)}
			<SearchDiv>
				<i class="fas fa-search"></i>
				<input className="search"
				placeholder="Buscar Persona"
				onChange={handleChangeSearch}
				/>
			</SearchDiv>
			<GridCards>
				{personasearch &&
					personasearch.map((persona) => (
						<Card.Wrapper key={persona.id}>
							<Card.Header>
								<Card.Image src={Personas} alt='personas-icon' />
								<div>
									<Card.Value>{persona.nombre}</Card.Value>
								</div>
							</Card.Header>
							<Card.Body>
								<Card.Item>
									<Card.Label>Apellido</Card.Label>
									<Card.Value>{persona.apellido}</Card.Value>
								</Card.Item>
								<Card.Item>
									<Card.Label>Email</Card.Label>
									<Card.Value>{persona.mail}</Card.Value>
								</Card.Item>
								<Card.Item>
									<Card.Label>Alias</Card.Label>
									<Card.Value>{persona.alias}</Card.Value>
								</Card.Item>
								<Card.Item>
									<Card.Label>Libros Prestados</Card.Label>
									{persona.libro.length <= 0 ? <Card.Value>No tiene libros prestados</Card.Value> : 
									persona.libro.map(unLibro => (
										<Card.Value>{unLibro.nombre}</Card.Value>
									))
									}
								</Card.Item>
							</Card.Body>
							<Card.Footer>
								<Card.Action onClick={() => handleEdit(persona.id)}>
									<i class="fas fa-edit"></i>
								</Card.Action>
								<Card.Action onClick={() => handleDelete(persona.id)}>
									<i class="fas fa-trash"></i>
								</Card.Action>
							</Card.Footer>
						</Card.Wrapper>
					))}
			</GridCards>
		</>
	)
}
