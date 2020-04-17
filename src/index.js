import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

import { Provider } from 'react-redux';
import store from './redux/store';

import { ThemeProvider } from 'styled-components';
import { THEME } from './constants';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={THEME}>
            <App />
        </ThemeProvider>
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
