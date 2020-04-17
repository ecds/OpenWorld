import { UPDATE_INFO } from '../actionTypes';

let initialState = {
    type: null,
    properties: {}
}

export default function (state=initialState, action) {
    switch(action.type) {
        case UPDATE_INFO: {
            return action.payload
        }
        default:
            return state;
    }
}