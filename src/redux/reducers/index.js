import { combineReducers } from 'redux';
import layerSelector from './layers';
import infoSelector from './info';

export default combineReducers({layerSelector, infoSelector});