import React, { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Tabs = lazy(() => import('../Tabs'));
const Map = lazy(() => import('../Map'));

const AppWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export default class App extends React.Component {
	render() {
		return (
			<AppWrapper>
				<Suspense fallback={<div>Loading...</div>}>
					<Tabs />
					<Map />
				</Suspense>
			</AppWrapper>
		);
	}
}
