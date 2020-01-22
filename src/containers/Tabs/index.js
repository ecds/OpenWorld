import React from 'react';
import styled from 'styled-components';
import TabInfo from './TabInfo.js';

import { Accordion, Card, Collapse } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import HamburgerMenu from 'react-hamburger-menu';

import InfoButtonGroup from '../Components/InfoButtonGroup';

import { THEME_COLOR, SECOND_COLOR, TEXT_COLOR } from '../../constants';

const Container = styled.div``;

const accordionStyle = {
	zIndex: 999,
	position: "absolute",
	borderRadius: "0px",
	right: 0,
	top: "55.6px",
	backgroundColor: THEME_COLOR,
	color: SECOND_COLOR,
	height: "calc(100vh - 55.6px)"
};

const cardStyle = {
	border: "none",
	borderBox: "none",
	borderRadius: "0px"
}

const cardBodyStyle = {
	height: "calc((100vh) - (55.6px + (3*2em)))",
	padding: "0.5em 1.5em",
	color: TEXT_COLOR,
}

const sidebarHeader = {
	border: "none",
	borderBottom: "1px solid rgba(0,0,0,.125)",
	borderRadius: "0",
	margin: "0",
	minHeight: "2em",
	maxHeight: "2em",
	backgroundColor: THEME_COLOR,
	color: "white",
	padding: "0.25em 1.5em",
	fontWeight: "bolder",
	cursor: "pointer",
}

const containerStyle = {
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
			height: "calc(100vh - 55.6px)"
		}
	}

	updateState() {
		if (window.innerWidth > 768) {
			this.setState({
				beforeResize: this.state.open, 
				open: true,
				height: "calc(100vh - 55.6px)",
			});
		} else {
			this.setState({
				beforeResize: this.state.open, 
				open: false,
				height: "auto",
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
			<Navbar variant="red">
				<Navbar.Brand href="#">OpenWorld Atlanta</Navbar.Brand>

				<HamburgerMenu
					className="menuControl"
					isOpen={this.state.open}
					menuClicked={this.setOpen}
					width={36}
					height={20}
					strokeWidth={4}
					rotate={0}
					color={SECOND_COLOR}
					borderRadius={4}
					animationDuration={0.25}
				/>
			</Navbar>
			<Collapse in={this.state.open}>
				<Accordion style={accordionStyle} onSelect={this.handleSelect} defaultActiveKey="0" activeKey={this.state.activeKey} id="sidebar" ref="Sidebar">
					<Card style={cardStyle}>
						<Accordion.Toggle as={Card.Header} style={sidebarHeader} variant="link" eventKey="0" id="layersHeader">
							LAYERS
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body id="layersCardBody" style={cardBodyStyle}>
								<TabInfo type={"desc"} text={"A Layer is a type of dataset that can be overlain on top of the base map, and contains data points that belong to the same category of data."} />
								<Container style={containerStyle} className="scroll-no-show" id="layersControls"/>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card style={cardStyle}>
						<Accordion.Toggle as={Card.Header} style={sidebarHeader} variant="link" eventKey="1" id="featuresHeader">
							FEATURES
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<Card.Body id="featuresCardBody" style={cardBodyStyle}>
								<TabInfo type={"desc"} text={"A Feature is a collection of objects (e.g. buildings, residential homes, city utilities) that are usually associated with data such as stories, multimedia files, and reconstructed 3D models."} />
								<Container id="featuresControls"/>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card style={cardStyle}>
						<Accordion.Toggle as={Card.Header} style={sidebarHeader} variant="link" eventKey="2">
							INFORMATION
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="2">
							<Card.Body id="infoCardBody" style={cardBodyStyle}>
								<TabInfo type={"info"} text={"Please select an object on the Map to view details."} />
								<div id={"object-info"} />
								<InfoButtonGroup />
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</Collapse>
		</Container>
		);
	}
}