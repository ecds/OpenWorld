import { ADD_LAYER, TOGGLE_LAYER } from '../actionTypes';

const initialState = {
    allIds: [],
    byIds: {}
};

export default function(state=initialState, action) {
    switch(action.type) {
        case ADD_LAYER: {
            const { id, content } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        content,
                        active: false
                    }
                }
            };
        }
        case TOGGLE_LAYER: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        active: !state.byIds[id].active
                    }
                }
            };
        }
        default:
            return state;
    }
}