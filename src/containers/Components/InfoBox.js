import React from 'react';
import styled from 'styled-components';
import { THEME_COLOR, TEXT_COLOR } from '../../constants';

const Wrapper = styled.div`
    min-width: calc((400px - 5em) / 3);
    width: calc((40vw - 5em) / 3);
    max-width: calc((500px - 5em) / 3);
`;

const highlight = {
    color: THEME_COLOR, 
    marginBottom: 0
}

export default class InfoBox extends React.Component {
    render() {
        return (
            <Wrapper>
                <p style={highlight}>{this.props.value}</p>
                <p>{this.props.property}</p>
            </Wrapper>
        )
    }
}