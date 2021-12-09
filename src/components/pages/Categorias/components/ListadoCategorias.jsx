import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { GridCards, Card } from '../../../common/Card'
import Categorias from '../../../assets/categorias.svg'
import { SearchDiv } from '../../../common/Search';

export const ListadoCategorias = () => {
	const [categorias, setCategorias] = useState([])
	const [categoriaSeatch, setCategoriaSearch] = useState([]);


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
			await axios.delete(`http://localhost:3001/api/categorias/${id}`)
			Swal.fire(
				'Eliminado!',
				'La Categoría fue eliminada correctamente',
				'success'
			)
			setTimeout(() => window.location.href = "http://localhost:3000/categorias", 1350);
		} catch (e) {
			Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	}

	const CategoriasLibros = async () => {
		try {
			const traerCategorias = await axios.get(
				'http://localhost:3001/api/categorias'
			)
			const traerLibros = await axios.get('http://localhost:3001/api/libros')

			const newListado = traerCategorias.data.respuesta.map((categoria) => {
				const libroAsociado = traerLibros.data.respuesta.filter(
					(libro) => libro.id_genero === categoria.id
				)
				categoria.libro = libroAsociado
				console.log(categoria)
				return categoria
			})

			setCategorias(newListado);
			setCategoriaSearch(newListado);
		} catch (e) {
			console.log(e)
		}
	}


	useEffect(() => {
		CategoriasLibros()
	}, []);

	const handleChangeSearch = (e) => {
		const categoria = categorias.filter(unaCategoria => unaCategoria.nombre.includes(e.target.value))
		setCategoriaSearch(categoria);
	}

	return (
		<>
		<SearchDiv>
				<i class="fas fa-search"></i>
				<input className="search"
				placeholder="Buscar Categoria"
				onChange={handleChangeSearch}
				/>
				</SearchDiv>
			<GridCards>
			{categoriaSeatch &&
				categoriaSeatch.map((categoria) => (
					<Card.Wrapper key={categoria.id}>
						<Card.Header>
							<Card.Image src={Categorias} alt='categorias-icon' />
							<div>
								<Card.Value>{categoria.nombre}</Card.Value>
							</div>
						</Card.Header>
						<Card.Body>
							<Card.ItemTitle>Libros Asociados</Card.ItemTitle>
							{categoria.libro.map((item) => (
									<div key={item.id}>
										<p key={item.id}>{item.nombre}</p>
									</div>
								))}
						</Card.Body>
						<Card.Footer>
							<Card.Action onClick={() => handleDelete(categoria.id)}>
								<i class="fas fa-trash"></i>
							</Card.Action>
						</Card.Footer>
					</Card.Wrapper>
					))}
		</GridCards>
		</>
	)
}
