import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import { Accordion, Collapse } from 'react-bootstrap';
import HamburgerMenu from 'react-hamburger-menu';
import styled from 'styled-components';

import { THEME } from '../../constants';

import StyledBrand from '../Components/StyledBrand';
import StyledNavbar from '../Components/StyledNavbar';

import Sidebar from '../Components/Sidebar';

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

class ErrorBoundary extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { hasError: false };
	}
  
	static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    
		return { hasError: true };  
	}
	componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service    
		//console.log(error, errorInfo);  
	}
	render() {
	  if (this.state.hasError) {      // You can render any custom fallback UI      
		return <h1>Something went wrong.</h1>;    
	}
	  return this.props.children; 
	}
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
				<Sidebar>
					<ErrorBoundary>
						<Suspense fallback={<div>idk</div>}>
							<InfoButtonGroup />
						</Suspense>
					</ErrorBoundary>
				</Sidebar>
			</Collapse>
		</Container>
		);
	}

	componentDidUpdate() {
		//console.log(this.props);
	}
}

const mapStateToProps = state => {
	switch(state.infoSelector.type) {
		case 'building':
			return { info: state.infoSelector, name: state.infoSelector.properties?.name_28, media: state.infoSelector.resources?.length };
		default:
			return { info: null, name: null }
	}
}

export default connect(mapStateToProps, null)(Tabs);