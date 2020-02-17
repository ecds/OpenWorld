import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    margin: 8px 0 16px 0 !important;
    cursor: ${props => props.onClick == null ? 'default' : 'pointer' };
`;

const Thumbnail = styled("img")`
    height: ${props => props.square ? 4 : 5}em;
    width: ${props => props.square ? 4 : 9.25}em;
    position: relative;
    object-fit: cover;
`;

const Title = styled.div`
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1em;
    vertical-align: middle;
    color: ${props => props.theme.TEXT};
    font-size: 1.4em;
    line-height: 1.15em;
`;

export default class ItemHeader extends React.Component {
    render() {
        return(
            <Row onClick={this.props.onClick}>
                <Thumbnail src={this.props.imgSrc} square={this.props.square} />
                <Title>{this.props.title}</Title>
            </Row>
        )
    }
}