import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Annexations from './containers/Map/Layers/Annexations';
import Buildings from './containers/Map/Layers/Buildings';
import StreetcarLines from './containers/Map/Layers/StreetcarLines';
import Wards from './containers/Map/Layers/Wards';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
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
