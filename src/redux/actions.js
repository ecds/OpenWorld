import { ADD_LAYER, 
         TOGGLE_LAYER, 
         UPDATE_INFO,
         FETCH_RESOURCES_BEGIN,
         FETCH_RESOURCES_SUCCESS,
         FETCH_RESOURCES_FAILURE } from './actionTypes';

export function addLayer(payload) {
    return { type: ADD_LAYER, payload };
}

export function toggleLayer(payload) {
    return { type: TOGGLE_LAYER, payload };
}

export function updateInfo(info) {
    return { type: UPDATE_INFO, payload: info };
}

function fetchResourcesBegin() {
    return { type: FETCH_RESOURCES_BEGIN };
}

function fetchResourcesSuccess(resources) {
    return { type: FETCH_RESOURCES_SUCCESS, payload: resources }
}

function fetchResourcesFailure(error) {
    return { type: FETCH_RESOURCES_FAILURE, payload: error }
}

export function fetchResources(endpoint) {
    return dispatch => {
        dispatch(fetchResourcesBegin());
        return fetch(endpoint)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchResourcesSuccess(json.resources));
                return json.resources;
            })
            .catch(error => dispatch(fetchResourcesFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}