import styled from 'styled-components'

export const ActionsSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	margin: 1rem 0rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid #ededed;
	align-items: flex-end;

	h2,
	h3,
	h4 {
		margin: 0;
		padding: 0;
	}

	@media (max-width: 800px){
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h2,
		h3,
		h4 {
		font-size: 1.2rem;
		margin: 0;
		padding: 0;
	}

	@media (max-width: 350px){
		h2,
		h3,
		h4 {
		font-size: 1rem;
		margin: 0;
		padding: 0;
	}
	}
`

export const FilterSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;

	label {
		color: grey;
		font-size: 0.9rem;
	}

	input,
	select {
		border: 1px solid #ededed;
		box-shadow: none;
		border-radius: 4px;
		padding: 3px;
		min-height: 35px;
		min-width: 150px;

		&&::placeholder {
			color: gray;
		}
	}
`

export const AddButton = styled.button`
	background: green;
	padding: 10px 15px;
	text-transform: uppercase;
	color: white;
	border: none;
	box-shadow: none;
	border-radius: 4px;
	font-size: 0.8rem;
	line-height: none;
	cursor: pointer;
	align-self: flex-end;

	&:hover {
		background: #016f01;
	}

	@media (max-width: 800px){
		align-self: center;
		margin-top: 1rem;
	}
`

export const FilterWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
`
