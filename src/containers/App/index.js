import React from 'react';
import Map from '../Map';
import Tabs from '../Tabs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AppWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 100px;
`;

const Container = styled.div``;

export default class App extends React.Component {
	render() {
		return (
			<AppWrapper>
				<Container>
					<Map />
				</Container>
				<Container>
					<Tabs />
				</Container>
			</AppWrapper>
		);
	}
}
