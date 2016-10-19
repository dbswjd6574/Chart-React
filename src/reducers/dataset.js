/**
 * Created by 윤정 on 2016-10-18.
 */
import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    datasetList: "",
    fieldList: "",
    sessionid: "",
    queryData: "",
    totalCount: ""
};

export default function dataset(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
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
        case types.GET_SESSION_ID_SUCCESS:
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
        case types.GET_TOTAL_COUNT_SUCCESS:
            return update(state, {
                totalCount: {
                    $set: action.data
                }
            });
        case types.GET_TOTAL_COUNT_FAILURE:
            return update(state, {
                totalCount: {
                    $set: {}
                }
            });
        default:
            return state;
    }
}