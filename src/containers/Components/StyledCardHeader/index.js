import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';

export default styled(Accordion.Toggle)`
	&&& {
		border: none;
		border-bottom: 1px solid rgba(0,0,0,.125);
		border-radius: 0;
		margin: 0;
		min-height: 2em;
		max-height: 2em;
		background-color: ${props => props.theme.MAIN};
		color: ${props => props.theme.SECOND};
		padding: 0.25em 1.5em;
		font-weight: bolder;
		cursor: pointer;
		text-align: left;
	}
`;