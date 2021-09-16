import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import { Collapse } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import HamburgerMenu from 'react-hamburger-menu';
import styled from 'styled-components';

import { THEME } from '../../constants';

import StyledBrand from '../Components/StyledBrand';
import Credit from '../Components/Credit';
import StyledNavbar from '../Components/StyledNavbar';

import Sidebar from '../Components/Sidebar';
import Spinner from '../Components/Spinner';

const InfoButtonGroup = lazy(() => import('../Components/InfoButtonGroup'));

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

const LoadingContainer = styled.div`
	width: 100%;

	div {
		margin: auto;
		display: block;
		text-align: center;
	}
`;

class Loading extends React.Component {
	render() {
		return <LoadingContainer>
			<Spinner color={'main'}/>
		</LoadingContainer>
	}
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.setOpen = this.setOpen.bind(this);

    this.state = {
      activeKey: undefined,
      lastActive: undefined,
      open: true,
      media: 0,
      modalOpen: false,
    };
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
        <StyledNavbar>
          <style type="text/css">
            {`
							.owa-btn-outline {
								background-color: ${THEME.MAIN} !important;
								border-color: white !important;
								opacity: 90%;
							}

							.owa-btn-outline:hover {
								transition: ease-in-out 150ms;
								opacity: 100%;
							}

							.owa-ecds-logo {
								position: absolute;
								right: 0;
								padding: 2px 15px;
								height: 40px;
								opacity: 90%;
								cursor: pointer;
							}

							.owa-ecds-logo:hover {
								transition: ease-in-out 150ms;
								opacity: 100%;
							}

							.owa-ecds-logo-container {
								position: absolute;
								top: 7px;
								right: 0;
							}

							@media (max-width: 768px) {
								.owa-ecds-logo {
									display: none;
								}
							}

						`}
          </style>
          <img
            src={"/logo192.png"}
            width={"40px"}
            height={"40px"}
            alt={"logo"}
          />
          <StyledBrand>OpenWorld Atlanta</StyledBrand>
          <Credit />
          <a href="https://ecds.emory.edu/" alt="ECDS Website" className="owa-ecds-logo-container">
						<img src={"/ecds.svg"} alt={"logo"} className="owa-ecds-logo" />
					</a>

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
              <Suspense fallback={<Loading />}>
                <InfoButtonGroup />
              </Suspense>
            </ErrorBoundary>
          </Sidebar>
        </Collapse>
      </Container>
    );
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