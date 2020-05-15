import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export default styled(Card.Body)`
    &&& {
        height: calc((100vh) - (55.6px + (3*2em)));
        padding: 0.5em 1.5em;
        color: ${props => props.theme.TEXT};
    }

    overflow-y: auto;
    scrollbar-width: none;
`;