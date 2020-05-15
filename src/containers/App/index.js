import React, { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Map from '../Map/new'; 
import MapProvider from '../Map/MapProvider';
//import Tabs from '../Tabs';

//const Map = lazy(() => import('../Map'));
const Tabs = lazy(() => import('../Tabs'));

const AppWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

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
					<Map />
					{this.state.mapLoaded && 
					<Suspense fallback={<div>Loading...</div>}>
						<Tabs />
					</Suspense>}
				</MapProvider>
			</AppWrapper>
		);
	}
}
