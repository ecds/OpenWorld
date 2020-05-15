import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
`;

export default class ObjectInfo extends React.Component {
    render() {
        return <Header>{this.props.title}</Header>
    }
}