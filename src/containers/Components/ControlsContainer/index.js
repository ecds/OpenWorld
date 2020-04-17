import styled from 'styled-components';

export default styled.div`
	label > div > span {
		font-weight: bold;
		position: relative;
		left: 8px;
	}

	label > div > i {
		height: 16px;
		width: 16px;
		background-size: 16px 16px;
		position: relative;
		float: left;
		top: 0.3em;
		left: 0;
		color: ${props => props.theme.TEXT};
	}

	label > div > p {
		position: relative;
		left: 24px;
	}

	div {
		border: none;
		border-radius: 0;
		box-shadow: none;
	}
	
	div label:hover {
		cursor: pointer;
	}
	
	div input[type=checkbox] {
		display: none;
	}

	div input[type=checkbox]:checked ~ i {
		color: ${props => props.theme.MAIN};
	}

	div input[type=checkbox]:unchecked ~ i {
		color: ${props => props.theme.TEXT};
	}

	div input[type=checkbox]:checked ~ span {
		color: ${props => props.theme.MAIN};
	}

	div input[type=checkbox]:unchecked ~ span {
		color: ${props => props.theme.TEXT};
	}
`;