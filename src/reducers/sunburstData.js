/**
 * Created by daehyun on 2016-10-18.
 */
import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    sunburstData : ""
}
export default function sunburstData(state, action){
    if(typeof state === "undefined"){
        state = initialState;
    }
    switch (action.type){
        case types.GET_DATA_SUCCESS:
            console.log("acton.data :: ",action.data.data);
            return update(state, {
                sunburstData: {
                    $set: action.data
                }
            });
        case types.GET_DATA_FAILURE:
            return update(state, {
                sunburstData: {
                    $set: {}
                }
            });
        default :
            return state;
    }
}