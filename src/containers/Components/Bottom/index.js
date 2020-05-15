import styled from 'styled-components';

export default styled.div`
	position: absolute;
	bottom: 0;
	height: 40px;
	width: 100%;
	background-image: linear-gradient(to top, ${props => props.theme.SECOND}FF, ${props => props.theme.SECOND}00);
`;