import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const EditFormLibro = (idEditarLibro, onClose) => {
	
	const [editLibro, setEditLibro] = useState({
		descripcion: ""
	})

	

	const handleChange = (e) => {
		setEditLibro({descripcion: e.target.value});
	}


	const handleSubmit = async () => {
		await axios
			.put(`http://localhost:3001/api/libros/${idEditarLibro.idEditarLibro}`, editLibro)
			.then((res) => {
				Swal.fire('Editado!', `${res.data}`, 'success')
				setTimeout(() => window.location.href = "http://localhost:3000/libros", 1300);
			})
			.catch((e) => {
				return Swal.fire('No se pudo Editar!', `${e.response.data}`, 'warning')
			})
	}


	return (
		<FormWrapper>
			<h2>Solo se puede Editar la descripcion</h2>
				<>
					<WrapperInput>
						<input
							type='text'
							name='descripcion'
							value={editLibro.descripcion}
							onChange={handleChange}
							placeholder='Descripcion'
						/>
					</WrapperInput>
					<ButtonsWrapper>
						<button
							className='button-primary'
							disabled={!editLibro.descripcion}
							onClick={() => handleSubmit()}
						>
							Editar
						</button>
						<button className='button-secondary' onClick={onClose}>
							Cancelar
						</button>
					</ButtonsWrapper>
				</>
			
		</FormWrapper>
	)
}
