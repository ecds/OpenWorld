import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export default styled(Navbar)`
    &&& {
        background-color: ${props => props.theme.MAIN};
        color: ${props => props.theme.TEXT};
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        z-index: 1000;
        min-width: 100vw;
    }

    #menuControl {
        position: fixed !important;
        right: 18px;
        margin-top: auto;
        margin-bottom: auto;
    }
`;