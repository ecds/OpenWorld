import React from 'react';
import styled from 'styled-components';

import Spinner from '../Spinner';

const Container = styled.div`
    border: none;
    border-radius: 0;
    box-shadow: none;

    margin-bottom: 1rem;

    :hover {
        cursor: pointer;
    }
`;

const Label = styled.span`
    font-weight: bold;
    position: relative;
    left: 8px;
    color: ${props => props.active ? props.theme.MAIN : props.theme.TEXT};
`;

const Description = styled.p`
    position: relative;
    left: 24px;
    margin-bottom: 0;
`;

const Icon = styled.i`
    color: ${props => props.active ? props.theme.MAIN : props.theme.TEXT};
`;

const Attribution = styled(Description)`
    font-style: italic;
`;

export default class GenericLayer extends React.Component {
    render() {
        console.log(this.props.loading)
        return (
            <Container onClick={this.props.onClick}>
                <Icon active={this.props.active}>
                    {this.props.loading ? 
                    <Spinner
                        width={'16px'}
                        height={'16px'}
                        thickness={'4px'}
                        margin={'2px auto auto auto'}
                    /> : 
                    this.props.icon}
                </Icon>
                <Label active={this.props.active}>{this.props.title}</Label>
                <Description>{this.props.desc}</Description>
                <Attribution>{this.props.attr}</Attribution>
            </Container>
        )
    }
}