import styled from 'styled-components';
import NavDropdown from 'react-bootstrap/NavDropdown'

export default styled(NavDropdown)`
    &&& {
        .dropdown-toggle {
            color: ${props => props.theme.SECOND};
            font-size: 1rem;
            margin-left: 1rem;
        }
    }
`;