import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export default styled(Navbar.Brand)`
    &&& {
        color: ${props => props.theme.SECOND};
        font-weight: bolder;
        margin-left: 1rem;
        font-size: 1.25rem;
        text-decoration: none;
        :hover {
            text-decoration: underline;
            color: ${props => props.theme.SECOND};
            cursor: pointer;
        }

        img {
            margin-right: 1rem;
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