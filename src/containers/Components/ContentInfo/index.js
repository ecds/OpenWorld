import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
    text-align: center;
    display: block;
    padding-top: 0.5em;
`;

export default class ContentInfo extends React.Component {
    render() {
        return (
            <Span>
                {this.props.num} {this.props.num === 1 ? this.props.singular : this.props.plural} available
            </Span>
        )
    }
}