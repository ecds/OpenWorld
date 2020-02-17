import React from 'react';
import TabInfo from './TabInfo.js';

import { Accordion, Card, Collapse } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import HamburgerMenu from 'react-hamburger-menu';
import styled from 'styled-components';

import InfoButtonGroup from '../Components/InfoButtonGroup';

import { THEME } from '../../constants';

const Container = styled.div`
	min-width: 100vw;
`;

const ControlsContainer = styled.div`
	label div span {
		font-weight: bold;
		position: relative;
		left: 8px;
	}

	label div i {
		height: 16px;
		width: 16px;
		background-size: 16px 16px;
		position: relative;
		float: left;
		top: 0.3em;
		left: 0;
		color: ${props => props.theme.TEXT};
	}

	div {
		border: none;
		border-radius: 0;
		box-shadow: none;
	}
	
	div label:hover {
		cursor: pointer;
	}
	
	div input[type=checkbox] {
		display: none;
	}

	div input[type=checkbox]:checked ~ i {
		color: ${props => props.theme.MAIN};
	}

	div input[type=checkbox]:unchecked ~ i {
		color: ${props => props.theme.TEXT};
	}

	div input[type=checkbox]:checked ~ span {
		color: ${props => props.theme.MAIN};
	}

	div input[type=checkbox]:unchecked ~ span {
		color: ${props => props.theme.TEXT};
	}
`;

const StyledAccordion = styled(Accordion)`
	&&& {
		z-index: 999;
		position: absolute;
		border-radius: 0px;
		right: 0;
		top: 55.6px;
		background-color: ${props => props.theme.MAIN};
		color: ${props => props.theme.SECOND};
		height: calc(100vh - 55.6px);
	}
`;

const StyledCard = styled(Card)`
	&&& {
		border: none;
		border-box: none;
		border-radius: 0px;
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

const StyledNavbar = styled(Navbar)`
	&&& {
		background-color: ${props => props.theme.MAIN};
		color: ${props => props.theme.TEXT};
		border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		z-index: 1000;
		min-width: 100vw;
	}

	#menuControl {
		position: fixed !important;
		right: 18px;
		margin-top: auto;
		margin-bottom: auto;
	}
`;

const StyledBrand = styled(Navbar.Brand)`
	&&& {
		color: ${props => props.theme.SECOND};
		font-weight: bolder;
		
		:hover {
			text-decoration: none;
			color: ${props => props.theme.SECOND};
			cursor: pointer;
		}
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

const Bottom = styled.div`
	position: absolute;
	bottom: 0;
	height: 40px;
	width: 100%;
	background-image: linear-gradient(to top, ${props => props.theme.SECOND}FF, ${props => props.theme.SECOND}00);
`;

let hamburgerOptions = {
	width: 36,
	height: 20,
	strokeWidth: 4,
	rotate: 0,
	color: THEME.SECOND,
	borderRadius: 4,
	animationDuration: 0.25,
}

export default class Tabs extends React.Component {
	constructor(props) {
		super(props);

		this.updateState = this.updateState.bind(this);
		this.setOpen = this.setOpen.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			activeKey: undefined,
			open: true,
			beforeResize: false,
		}
	}

	updateState() {
		if (window.innerWidth > 768) {
			this.setState({
				beforeResize: this.state.open, 
				open: true,
			});
		} else {
			this.setState({
				beforeResize: this.state.open, 
				open: false,
			});
		}
	}

	handleSelect(activeKey) {
		if (activeKey != null)
			this.setState({ activeKey: activeKey });
	}

	setOpen() {
		this.setState({ open: !this.state.open });
	}

	componentDidMount() {
		this.updateState();
		window.addEventListener("resize", this.updateState);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateState);
	}

	render() {
		return (
		<Container>
			<StyledNavbar /*style={navbarStyle}* variant="red" >
				<Navbar.Brand href="#">OpenWorld Atlanta</Navbar.Brand*/>
				<StyledBrand>OpenWorld Atlanta</StyledBrand>
				<div id="menuControl">
					<HamburgerMenu id="menuControl" 
						isOpen={this.state.open} 
						menuClicked={this.setOpen} 
						{...hamburgerOptions} 
					/>
				</div>
			</StyledNavbar>
			<Collapse in={this.state.open}>
				<StyledAccordion onSelect={this.handleSelect} defaultActiveKey="0" activeKey={this.state.activeKey} id="sidebar" ref="Sidebar">
					<StyledCard>
						<StyledCardHeader variant="link" id="layersHeader" eventKey="0">
							LAYERS
						</StyledCardHeader>
						<Accordion.Collapse eventKey="0">
							<StyledCardBody id="layersCardBody">
								<TabInfo type={"desc"} text={"A Layer is a type of dataset that can be overlain on top of the base map, and contains data points that belong to the same category of data."} />
								<ControlsContainer id="layersControls"/>
								<Bottom />
							</StyledCardBody>
						</Accordion.Collapse>
					</StyledCard>
					<StyledCard>
						<StyledCardHeader variant="link" id="featuresHeader" eventKey="1">
							FEATURES
						</StyledCardHeader>
						<Accordion.Collapse eventKey="1">
							<StyledCardBody id="featuresCardBody">
								<TabInfo type={"desc"} text={"A Feature is a collection of objects (e.g. buildings, residential homes, city utilities) that are usually associated with data such as stories, multimedia files, and reconstructed 3D models."} />
								<ControlsContainer id="featuresControls"/>
								<Bottom />
							</StyledCardBody>
						</Accordion.Collapse>
					</StyledCard>
					<StyledCard>
						<StyledCardHeader variant="link" eventKey="2">
							INFORMATION
						</StyledCardHeader>
						<Accordion.Collapse eventKey="2">
							<StyledCardBody id="infoCardBody">
								<TabInfo type={"info"} text={"Please select an object on the Map to view details."} />
								<div id={"object-info"} />
								<InfoButtonGroup />
								<Bottom />
							</StyledCardBody>
						</Accordion.Collapse>
					</StyledCard>
				</StyledAccordion>
			</Collapse>
		</Container>
		);
	}
}