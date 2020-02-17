import React from 'react';
import Map from '../Map';
import Tabs from '../Tabs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { ThemeProvider } from 'styled-components';
import { THEME } from '../../constants';

const AppWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export default class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={THEME}>
				<AppWrapper>
					<Map />
					<Tabs />
				</AppWrapper>
			</ThemeProvider>
		);
	}
}
