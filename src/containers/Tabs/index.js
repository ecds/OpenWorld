import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import { Accordion, Collapse } from 'react-bootstrap';
import HamburgerMenu from 'react-hamburger-menu';
import styled from 'styled-components';

import { THEME } from '../../constants';

import Bottom from '../Components/Bottom';
import ControlsContainer from '../Components/ControlsContainer';
import StyledAccordion from '../Components/StyledAccordion';
import StyledBrand from '../Components/StyledBrand';
import StyledCard from '../Components/StyledCard';
import StyledCardBody from '../Components/StyledCardBody';
import StyledCardHeader from '../Components/StyledCardHeader';
import StyledNavbar from '../Components/StyledNavbar';
import TabInfo from './TabInfo';

const InfoButtonGroup = lazy(() => import('../Components/InfoButtonGroup'));
const ObjectInfo = lazy(() => import('../Components/ObjectInfo'));
const InfoBox = lazy(() => import('./InfoBox'));

const Container = styled.div`
	min-width: 100vw;
`;

let hamburgerOptions = {
	width: 36,
	height: 20,
	strokeWidth: 4,
	rotate: 0,
	color: THEME.SECOND,
	borderRadius: 4,
	animationDuration: 0.3,
}

class Tabs extends React.Component {
	constructor(props) {
		super(props);

		this.updateState = this.updateState.bind(this);
		this.setOpen = this.setOpen.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			activeKey: undefined,
			lastActive: undefined,
			open: true,
			media: 0,
		}
	}

	updateState() {
		if (window.innerWidth > 768 && !this.state.open) {
			this.setState({
				open: true,
				activeKey: this.state.lastActive,
				lastActive: undefined,
			});
		} else if (window.innerWidth <= 768 && this.state.open) {
			this.setState({
				open: false,
				lastActive: this.state.activeKey,
				activeKey: undefined,
			});
		}
	}

	handleSelect(activeKey) {
		return false;
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

	componentDidUpdate() {
		//console.log(this.props)
	}

	render() {
		return (
		<Container>
			<StyledNavbar>
				<StyledBrand>OpenWorld Atlanta</StyledBrand>
				<div id="menuControl">
					<HamburgerMenu 
						isOpen={this.state.open} 
						menuClicked={this.setOpen} 
						{...hamburgerOptions} 
					/>
				</div>
			</StyledNavbar>
			<Collapse in={this.state.open} timeout={300}>
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
								{
									this.props.info ? 
									<Suspense fallback={<div>Loading...</div>}>
										<ObjectInfo title={this.props.name} />
										<InfoBox properties={this.props.info?.properties} type={this.props.info?.type} />
										<InfoButtonGroup />
									</Suspense> : 
									<TabInfo type={"info"} text={"Please select a feature on the Map to view details."} /> 
								}
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

const mapStateToProps = state => {
	switch(state.infoSelector.type) {
		case 'building':
			return { info: state.infoSelector, name: state.infoSelector.properties?.name_28 };
		default:
			return { info: null, name: null }
	}
}

export default connect(mapStateToProps, null)(Tabs);