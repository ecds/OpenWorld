import React from 'react';
import styled from 'styled-components';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

import Spinner from '../Spinner';

export const Container = styled.div`
    border: none;
    border-radius: 0;
    box-shadow: none;

    margin-bottom: 1rem;

    :hover {
        cursor: pointer;
    }
`;

export const Label = styled.label`
    font-weight: bold;
    position: relative;
    left: 8px;
    color: ${props => props.active ? props.activeColor : props.theme.TEXT};
`;

export const Description = styled.p`
    position: relative;
    left: 24px;
    margin-bottom: 0;
`;

export const Icon = styled.i`
    color: ${props => props.active ? props.theme.MAIN : props.theme.TEXT};
`;

export const Attribution = styled(Description)`
    font-style: italic;
`;

export default class GenericLayer extends React.Component {

    componentDidUpdate(prevState) {
        if ((this.props.groupActive !== prevState.groupActive) && this.props.groupActive !== this.props.active) {
          this.props.onClick();
      }
    }

    render() {
        return (
            <Container>
                {/* <label> */}
                    <Label htmlFor={`${this.props.id}-toggle`} active={this.props.active} activeColor={this.props.activeColor} style={{color:this.props.color}}>
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
                        </Icon>&nbsp;
                        {this.props.title}
                    </Label>
                    <Description>{this.props.desc}</Description>
                    <Attribution>{this.props.attr}</Attribution>
                {/* </label> */}
            </Container>
        )
    }
}