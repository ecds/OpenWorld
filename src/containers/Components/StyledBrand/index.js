import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export default styled(Navbar.Brand)`
    &&& {
        color: ${props => props.theme.SECOND};
        font-weight: bolder;
        margin-left: 1rem;
        
        :hover {
            text-decoration: none;
            color: ${props => props.theme.SECOND};
            cursor: pointer;
        }
    }


    @media (max-width: 768px) { 
        ~ div {
            display: inline-block;
        }
    } 

        
    @media (min-width: 769px) {
        ~ div {
            display: none;
        }
    }
`;