import React from 'react';
import styled from 'styled-components';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Container = styled.div`
    width: 33%;
    padding-bottom: 0.5rem;
`;

const Tag = styled.div`
    font-weight: 600;
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
                    <Tag>{this.props.tag}</Tag>
                    <Value>{this.props.value}</Value>
                </Container>
            </OverlayTrigger> :
            <Container>
                <Tag>{this.props.tag}</Tag>
                <Value>{this.props.value}</Value>
            </Container>
        )
    }
}