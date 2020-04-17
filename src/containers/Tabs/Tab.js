import React from 'react';
import styled from 'styled-components';

import { Accordion, Card } from 'react-bootstrap';

import TabInfo from './TabInfo';

const StyledCard = styled(Card)`
	&&& {
		border: none;
		border-box: none;
		border-radius: 0px;
	}
`;

const StyledCardHeader = styled(Accordion.Toggle)`
	&&& {
		border: none;
		border-bottom: 1px solid rgba(0,0,0,.125);
		border-radius: 0;
		margin: 0;
		min-height: 2em;
		max-height: 2em;
		background-color: ${props => props.theme.MAIN};
		color: ${props => props.theme.SECOND};
		padding: 0.25em 1.5em;
		font-weight: bolder;
		cursor: pointer;
		text-align: left;
	}
`;

const StyledCardBody = styled(Card.Body)`
	&&& {
		height: calc((100vh) - (55.6px + (3*2em)));
		padding: 0.5em 1.5em;
		color: ${props => props.theme.TEXT};
	}
	
	overflow-y: auto;
	scrollbar-width: none;
`;

export default class Tab extends React.Component {
    render() {
        return (
            <StyledCard>
                <StyledCardHeader variant="link" eventKey={this.props.eventKey}>
                    {this.props.title}
                </StyledCardHeader>
                <Accordion.Collapse eventKey={this.props.eventKey}>
                    <StyledCardBody id="infoCardBody">
                        <TabInfo type={this.props.infoType} text={this.props.infoText} />
                    </StyledCardBody>
                </Accordion.Collapse>
            </StyledCard>
        )
    }
}