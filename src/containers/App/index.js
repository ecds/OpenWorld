import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import MapProvider from '../Map/MapProvider';
import Spinner from '../Components/Spinner';
import StyledNavbar from '../Components/StyledNavbar';
import StyledBrand from '../Components/StyledBrand';
import Header from '../Components/Header';
import Annexations from '../Map/Layers/Annexations';
import Wards from '../Map/Layers/Wards';
import Buildings from '../Map/Layers/Buildings';
import LayerGroup from '../Components/LayerGroup';
import StreetcarLines from '../Map/Layers/StreetcarLines';
import WatermarkControl from '../Components/WatermarkControl';

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
						{/* <WatermarkControl /> */}
						{/* {this.state.mapLoaded} */}
						<Router>
							<Header />
							<Switch>
								<Route path="/annexations" component={ Annexations } />
								<Route path="/buildings/:year" component={ Buildings } />
								<Route path="/streetcars/:year" component= { StreetcarLines } />
								<Route path="/wards" component={ Wards } />
								{/* <Route path="/streetcars/:year" render={() => <LayerGroup {...StreetcarLayers(1924)} /> } /> */}
							</Switch>
						</Router>
					</Suspense>
				</MapProvider>
			</AppWrapper>
		);
	}
}
