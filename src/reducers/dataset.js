/**
 * Created by 윤정 on 2016-10-18.
 */
import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    datasetList: ""
};

export default function dataset(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        case types.GET_DATA:
            return update(state, {
            });
        case types.GET_DATA_SUCCESS:
            return update(state, {
                datasetList: {
                    $set: action.data
                }
            });
        case types.GET_DATA_FAILURE:
            return update(state, {
                datasetList: {
                    $set: {}
                }
            });
        default:
            return state;
    }
}