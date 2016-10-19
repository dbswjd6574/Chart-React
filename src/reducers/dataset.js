/**
 * Created by 윤정 on 2016-10-18.
 */
import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    datasetList: "",
    logData: "",
    fieldList: "",
    sessionid: "",
    queryData: ""
};

export default function dataset(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        case types.GET_DATA_SET_LIST:
            return update(state, {
            });
        case types.GET_DATA_SET_LIST_SUCCESS:
            return update(state, {
                datasetList: {
                    $set: action.data
                }
            });
        case types.GET_DATA_SET_LIST_FAILURE:
            return update(state, {
                datasetList: {
                    $set: {}
                }
            });

        case types.GET_LOG_DATA:
            return update(state, {
            });
        case types.GET_LOG_DATA_SUCCESS:
            return update(state, {
                logData: {
                    $set: action.data
                }
            });
        case types.GET_LOG_DATA_FAILURE:
            return update(state, {
                logData: {
                    $set: {}
                }
            });

        case types.GET_FIELD_LIST:
            return update(state, {
            });
        case types.GET_FIELD_LIST_SUCCESS:
            return update(state, {
                fieldList: {
                    $set: action.data
                }
            });
        case types.GET_FIELD_LIST_FAILURE:
            return update(state, {
                fieldList: {
                    $set: {}
                }
            });
        case types.GET_STATUS:
            return update(state, {
            });
        case types.GET_SESSION_ID_SUCCESS:
            console.log('reducer', action.data);
            return update(state, {
                sessionid: {
                    $set: action.data
                }
            });
        case types.GET_SESSION_ID_FAILURE:
            return update(state, {
                sessionid: {
                    $set: {}
                }
            });
        case types.QUERY_SUCCESS:
            console.log("query success :: ",action.data);
            return update(state, {
                queryData: {
                    $set: action.data
                }
            });
        case types.QUERY_FAILURE:
            return update(state, {
                queryData: {
                    $set: {}
                }
            });
        default:
            return state;
    }
}