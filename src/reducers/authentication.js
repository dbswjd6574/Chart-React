import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    chartData: ""
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        case types.GET_DATA:
            return update(state, {
            });
        case types.GET_DATA_SUCCESS:
            return update(state, {
                chartData: {
                    $set: action.data
                }
            });
        case types.GET_DATA_FAILURE:
            return update(state, {
                chartData: {
                    $set: {}
                }
            });
        default:
            return state;
    }
}