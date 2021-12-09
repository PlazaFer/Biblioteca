import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import NewFormLibros from "./components/NewformLibros";
import { useParams } from 'react-router-dom'
import { GridCards, Card } from '../../common/Card'
import { Section } from '../../common/Section'
import LibrosIcon from '../../assets/libros.svg'
import { EditFormLibro } from './components/EditFormLibro'
import { Titulo } from '../../common/Titulo'
import { ActionsSection, AddButton } from '../../common/ActionsSection'
import { SearchDiv } from '../../common/Search';
import PrestarFormLibro from './components/PrestarFormLibro';

export const Libros = () => {
	const [libros, setLibros] = useState([])
	const [librossearch, setLibrossearch] = useState([]);



	const [idPrestar, setIdPrestar] = useState({
		id: ''
	})
	const [showPrestarForm, setShowPrestarForm] = useState(false);

	
	const [showNewForm, setShowNewForm] = useState(false)
	
	const [showEditForm, setShowEditForm] = useState(false)
	const [idEditarLibro, setIdEditarLibro] = useState({
		id: ''
	})
	

	const [categorias, setCategorias] = useState([
		{
			nombre: '',
		},
	])
	
	const params = useParams()



	const TraerLibros = async () => {
		try {
			const traerPersonas = await axios.get(
				'http://localhost:3001/api/personas'
			)
			const traerLibros = await axios.get('http://localhost:3001/api/libros')
			const traerCategorias = await axios.get(
				'http://localhost:3001/api/categorias'
			)
			setCategorias(traerCategorias.data.respuesta)

			const newListado = traerLibros.data.respuesta.map((libro) => {
				const personaAsociada = traerPersonas.data.respuesta.find(
					(persona) => persona.id === libro.id_persona
				)
				libro.persona = personaAsociada
				return libro
			})

			const newListadoAll = newListado.map((libro) => {
				const categoriaAsociada = traerCategorias.data.respuesta.find(
					(categoria) => categoria.id === libro.id_genero
				)
				libro.categoria = categoriaAsociada
				return libro
			})

			setLibros(newListadoAll);
			setLibrossearch(newListadoAll);
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		TraerLibros()
	}, [])

	const handleDevolver = async (id) => {
		await axios
			.put(`http://localhost:3001/api/libros/devolver/${id}`)
			.then((res) => {
				Swal.fire('Devuelto!', `${res.data}`, 'success')
				setTimeout(() => window.location.href = "http://localhost:3000/libros", 1000);
			})
			.catch((e) => {
				Swal.fire('Ups! No se pudo Devolver', `${e.response.data}`, 'warning')
			})
	}

	const handlePrestar =  (id) => {
		setIdPrestar(id);
		setShowPrestarForm(true);
	}


	const handleDelete = async (id) => {
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
			await axios.delete(`http://localhost:3001/api/libros/${id}`)
			Swal.fire('Eliminado!', 'El Libro fue eliminado correctamente', 'success')
			setTimeout(() => window.location.href = "http://localhost:3000/libros", 1300);
		} catch (e) {
			Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	}

	const handleEdit =  (id) => {
		setIdEditarLibro(id);
		setShowEditForm(true)
	}
 
	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params]);

	const handleChangeSearch = (e) => {
		const libro = libros.filter(unLibro => unLibro.nombre.includes(e.target.value))
		setLibrossearch(libro);
	}

	return (
		<>
			<Titulo nombre='Libros' />
			<Section>
				<ActionsSection>
					<h2>Listado de Libros en Biblioteca</h2>
					<AddButton onClick={() => setShowNewForm(true)}>
						Agregar Libro
					</AddButton>
				</ActionsSection>
			</Section>
			<Section>
				{showEditForm && (
					<EditFormLibro
						idEditarLibro={idEditarLibro}
						onClose={() => setShowEditForm(false)}
					/>
			)}	
			{showPrestarForm &&
			<PrestarFormLibro 
			idPrestar={idPrestar}
			onClose={() => setShowPrestarForm(false)}
			/>
			}
			{showNewForm &&
			<NewFormLibros 
			categorias={categorias}
			onClose={() => setShowNewForm(false)}
			/>
			}
				<SearchDiv>
				<i class="fas fa-search"></i>
				<input className="search"
				placeholder="Buscar Libro"
				onChange={handleChangeSearch}
				/>
				</SearchDiv>
				<GridCards>
					{librossearch &&
						librossearch.map((libro) => (
							<Card.Wrapper key={libro.id}>
								<Card.Header>
									<Card.Image src={LibrosIcon} alt='personas-icon' />
									<div>
										<Card.Value>{libro.nombre}</Card.Value>
									</div>
								</Card.Header>
								<Card.Body>
									<Card.Item>
										<Card.Label>Descripción</Card.Label>
										<Card.Value>{libro.descripcion}</Card.Value>
									</Card.Item>
									<Card.Item>
										<Card.Label>Categoría</Card.Label>
										<Card.Value>{libro.categoria.nombre}</Card.Value>
									</Card.Item>
									<Card.Item>
										<Card.Label>Prestado a:</Card.Label>
										<Card.Value>
											{libro.persona
												? libro.persona.nombre + ' ' + libro.persona.apellido
												: 'En Biblioteca'}
										</Card.Value>
									</Card.Item>
								</Card.Body>
								<Card.Footer>
									<Card.Action
										onClick={() => handlePrestar(libro.id)}
										disabled={libro.persona}
									>
										<i class="fas fa-share"></i>
									</Card.Action>
									<Card.Action
										onClick={() => handleDevolver(libro.id)}
										disabled={!libro.persona}
									>
										<i class="fas fa-undo-alt"></i>
									</Card.Action>
									<Card.Action onClick={() => handleEdit(libro.id)}>
										<i class="fas fa-edit"></i>	
									</Card.Action>
									<Card.Action onClick={() => handleDelete(libro.id)}>
										<i class="fas fa-trash"></i>
									</Card.Action>
								</Card.Footer>
							</Card.Wrapper>
						))}
				</GridCards>
			</Section>
		</>
	)
}
