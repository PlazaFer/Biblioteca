import React, { useState, Fragment } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form';
import { Section } from '../../../common/Section';

const NewformLibros = ({categorias, onClose}) => {

    const [newLibro, setNewlibro] = useState({
		nombre: '',
		descripcion: '',
		id_genero: '',
	})

    const handleChange = (e) => {
		setNewlibro({
			...newLibro,
			[e.target.name]: e.target.value,
		})
	}

    const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/libros', newLibro)
			.then((res) => {
				Swal.fire('Agregado!', `${res.data}`, 'success')
				setTimeout(() => window.location.href = "http://localhost:3000/libros", 1350);
			})
			.catch((e) => {
				return Swal.fire('No se pudo Agregar!', `${e.response.data}`, 'warning')
			})
	}

    return (
        <Fragment>
            <Section className='section-form'>
					<FormWrapper>
						<h3>Agrega un nuevo Libro</h3>
						<WrapperInput>
							<label htmlFor='nombre'>Nombre</label>
							<input
								type='text'
								name='nombre'
								value={newLibro.nombre}
								onChange={handleChange}
								required
							/>
						</WrapperInput>
						<WrapperInput>
							<label htmlFor='descripcion'>Descripción</label>
							<input
								type='text'
								name='descripcion'
								value={newLibro.descripcion}
								onChange={handleChange}
								required
							/>
						</WrapperInput>
						<WrapperInput>
							<label htmlFor='categoria'>Seleccionar Categoría</label>
							<select name='id_genero' onChange={handleChange}>
								<option selected disabled>
									--Selecciona--
								</option>
								{categorias.map((categoria) => (
									<option key={categoria.id} value={categoria.id}>
										{categoria.nombre}
									</option>
								))}
							</select>
						</WrapperInput>
						<ButtonsWrapper>
							<button
								className='button-primary'
								onClick={handleSubmit}
								disabled={
									!newLibro.nombre ||
									!newLibro.descripcion ||
									!newLibro.id_genero
								}
							>
								Agregar
							</button>
							<button className='button-secondary' onClick={onClose}>
								Cancelar
							</button>
						</ButtonsWrapper>
					</FormWrapper>
				</Section>
        </Fragment>
)}


export default NewformLibros
