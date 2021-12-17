import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

export default styled(Nav.Link)`
    &&& {
        color: ${props => props.theme.SECOND};
        font-size: 1rem;
        margin-left: 1rem;
    }
`;