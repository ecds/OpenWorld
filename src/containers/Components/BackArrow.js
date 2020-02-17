import styled from 'styled-components';

export default styled.span`
    cursor: pointer;
    font-weight: bold;
    color: ${props => props.theme.MAIN};
    text-align: center;
    display: block;
    padding-top: 0.5em;
`;