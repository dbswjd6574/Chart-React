import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        /*case types.GET_DATA:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.GET_DATA_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.GET_DATA_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });*/
        default:
            return state;
    }
}