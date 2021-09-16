import React from 'react';
import styled from 'styled-components';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

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
        return (
            <Container>
                <label htmlFor={`${this.props.id}-toggle`}>
                    <input className="layer-checkbox" type="checkbox" id={`${this.props.id}-toggle`} checked={this.props.active} onChange={this.props.onClick} />
                    <Icon active={this.props.active}>
                        {this.props.loading ?
                            <Spinner
                                width={'16px'}
                                height={'16px'}
                                thickness={'4px'}
                                margin={'2px auto auto auto'}
                            /> :
                            this.props.active ?
                                <FaCheckSquare /> :
                                <FaRegSquare />
                        }
                    </Icon>
                    <Label active={this.props.active}>{this.props.title}</Label>
                    <Description>{this.props.desc}</Description>
                    <Attribution>{this.props.attr}</Attribution>
                </label>
            </Container>
        )
    }
}