import styled from 'styled-components';

export default styled.div`
	&&& {
		z-index: 999;
		position: absolute;
		border-radius: 0px;
		right: 0;
		top: 55.6px;
		background-color: ${props => props.theme.SECOND};
		color: ${props => props.theme.TEXT};
		height: calc(100vh - 55.6px);
		padding: 1rem;
	}

	@media (max-width: 768px) {
		min-width: 100vw;
		max-width: 100vw;
	}

	@media (min-width: 769px) {
		min-width: 400px;
		width: 40vw;
		max-width: 500px;
	}
`;