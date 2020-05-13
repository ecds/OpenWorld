import { UPDATE_INFO,
         FETCH_RESOURCES_BEGIN,
         FETCH_RESOURCES_SUCCESS,
         FETCH_RESOURCES_FAILURE } from '../actionTypes';

let initialState = {
    type: null,
    properties: {},
    resources: [],
    loading: false,
    error: null,
}

export default function (state=initialState, action) {
    switch(action.type) {
        case UPDATE_INFO: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case FETCH_RESOURCES_BEGIN: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case FETCH_RESOURCES_SUCCESS: {
            return {
                ...state,
                loading: false,
                resources: action.payload,
            };
        }
        case FETCH_RESOURCES_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                resources: [],
            };
        }
        default:
            return state;
    }
}