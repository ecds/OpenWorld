import React from 'react';
import styled from 'styled-components';

/* HTML and CSS courtesy of https://loading.io/css/ under the CC0 license */

const Wrapper = styled.div`
    display: inline;
    
    .lds-ring {
        display: inline-block;
        position: relative;
        width: ${props => props.width ?? '80px'};
        height: ${props => props.height ?? '80px'};
    }

    .lds-ring div {
        box-sizing: border-box;
        position: absolute;
        width: ${props => props.width ?? '80px'};
        height: ${props => props.height ?? '80px'};
        margin: ${props => props.margin ?? '8px'};
        border: ${props => props.thickness ?? '8px'} solid ${props => props.theme.TEXT};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props => props.color === 'main' ? props.theme.MAIN : props.theme.TEXT} transparent transparent transparent;
    }

    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;  

export default class Spinner extends React.Component {
    render() {
        console.log(this.props)
        return <Wrapper {...this.props}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Wrapper>
    }
}