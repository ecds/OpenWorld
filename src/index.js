import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

import { ThemeProvider } from 'styled-components';
import { THEME } from './constants';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={THEME}>
        <Router>
							<Switch>
                                <Route path="/" component={ App } />
								{/* <Route path="/streetcars/:year" render={() => <LayerGroup {...StreetcarLayers(1924)} /> } /> */}
							</Switch>
						</Router>
            {/* <App /> */}
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
