import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    mongoData : "null"
};

export default function mongo(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        case types.GET_DATA:
            return update(state, {
            });
        case types.GET_M_DATA_SUCCESS:
            console.log("get_m_data_success", action.data);
            return update(state, {
                mongoData : {
                    $set: action.data
                }
            });
        default:
            return state;
    }
}