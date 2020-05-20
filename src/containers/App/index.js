import React, { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import MapProvider from '../Map/MapProvider';
import Spinner from '../Components/Spinner';
import StyledNavbar from '../Components/StyledNavbar';
import StyledBrand from '../Components/StyledBrand';

const Map = lazy(() => import('../Map'));
const Tabs = lazy(() => import('../Tabs'));

const AppWrapper = styled.div`
	display: inline;/*
	justify-content: center; */
`;

const Container = styled.div`
	min-width: 100vw;
	height: 100vh;
	display: block;
`;

const SpinContainer = styled.div`
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
`;

class Loading extends React.Component {
	render() {
		return(
			<Container>
				<StyledNavbar>
					<img src={'/logo192.png'} width={'40px'} height={'40px'} alt={'logo'}/>
					<StyledBrand>OpenWorld Atlanta</StyledBrand>
				</StyledNavbar>
				<SpinContainer>
					<Spinner thickness={'12px'} width={120}/>	
				</SpinContainer>
			</Container>
		);
	}
}

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { mapLoaded: false };
	}

	componentDidMount() {
		this.setState({ mapLoaded: true });
	}

	render() {
		return (
			<AppWrapper>
				<MapProvider>
					<Suspense fallback={<Loading />}>
						<Map />
						{this.state.mapLoaded && <Tabs />}
					</Suspense>
				</MapProvider>
			</AppWrapper>
		);
	}
}
