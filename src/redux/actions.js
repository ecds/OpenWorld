import { ADD_LAYER, TOGGLE_LAYER, UPDATE_INFO } from './actionTypes';

export function addLayer(payload) {
    return { type: ADD_LAYER, payload }
}

export function toggleLayer(payload) {
    return { type: TOGGLE_LAYER, payload }
}

export function updateInfo(payload) {
    return { type: UPDATE_INFO, payload }
}