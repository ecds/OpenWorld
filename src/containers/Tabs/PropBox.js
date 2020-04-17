import React from 'react';
import styled from 'styled-components';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Container = styled.div`
    width: 33%;
    padding-bottom: 1rem;
`;

const Tag = styled.div`
    font-weight: 400;
    color: ${props => props.theme.MAIN};
`;

const Value = styled.div``;

export default class PropBox extends React.Component {
    render() {
        return (
            this.props.tooltip ?
            <OverlayTrigger
                key={this.props.tag}
                placement={'bottom'}
                overlay={
                    <Tooltip id={`tooltip-${this.props.tag}`}>
                        {this.props.tooltip}
                    </Tooltip>
                }
            >
                <Container>
                    <Value>{this.props.value}</Value>
                    <Tag>{this.props.tag}</Tag>
                </Container>
            </OverlayTrigger> :
            <Container>
                <Value>{this.props.value}</Value>
                <Tag>{this.props.tag}</Tag>
            </Container>
        )
    }
}