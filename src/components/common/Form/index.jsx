import styled from 'styled-components'

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	background-color: transparent;
	position: relative;
	padding: 2rem 0rem 4rem;
	transition: all ease 500ms;

	h3 {
		align-self: center;
	}

	@media (max-width: 600px){
		width: 80%;
	}

	@media (max-width: 400px){
		width: 100%;
	}
`

export const WrapperInput = styled.div`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	& label{
		margin-left: .5rem;
	}
`

export const ButtonsWrapper = styled.div`
	display: flex;
	gap: 5px;
	flex-wrap: nowrap;
`
