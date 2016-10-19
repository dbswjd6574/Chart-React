import {
    GET_DATA_SET_LIST,
    GET_DATA_SET_LIST_SUCCESS,
    GET_DATA_SET_LIST_FAILURE,
    GET_LOG_DATA,
    GET_LOG_DATA_SUCCESS,
    GET_LOG_DATA_FAILURE,
    GET_FIELD_LIST,
    GET_FIELD_LIST_SUCCESS,
    GET_FIELD_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function datasetListRequest() {
    return (dispatch) => {
        dispatch(datasetList());

        // API REQUEST
        return axios.post('/api/chart/dataset', {"id": "111111", "value": [{"id": "1234"}]})
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS dataset!', response);
                const data = response.data;
                dispatch(datasetListSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(datasetListFailure());
            });
    };
}

export function datasetList() {
    return {
        type: GET_DATA_SET_LIST
    };
}

export function datasetListSuccess(response) {
    return {
        type: GET_DATA_SET_LIST_SUCCESS,
        data: response
    };
}

export function datasetListFailure() {
    return {
        type: GET_DATA_SET_LIST_FAILURE
    };
}

export function fieldListRequest(id, table, fieldId) {
    return (dispatch) => {
        dispatch(fieldList());

        // API REQUEST
        return axios.post('/api/chart/fieldList',{
            "id": id,
            "tables": table,
            "query":[
                {"key": fieldId}
            ]
        })
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS fieldList!', response);
                const data = getFieldListData(response.data.sessionId);
                dispatch(fieldListSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(fieldListFailure());
            });
    };
}
function getFieldListData(sessionId) {
    console.info('START Polling...');

    let flag = false;
    let result;
    while(flag) {
        result = checkStatus(sessionId);
        if (result && result.value) {
            flag = false;
        }
    }
    console.info('END Polling...');
    return result;
}

function checkStatus(sessionId) {
    return axios.post('/api/chart/status',{
        "sessionId": sessionId
    })
        .then((response) => {
            // SUCCEED
            console.info('SUCCESS status!', response);
            return response.data;
        }).catch((error) => {
            // FAILED
            return null;
        });
}

export function fieldList() {
    return {
        type: GET_LOG_DATA
    };
}

export function fieldListSuccess(response) {
    return {
        type: GET_LOG_DATA_SUCCESS,
        data: response
    };
}

export function fieldListFailure() {
    return {
        type: GET_LOG_DATA_FAILURE
    };
}


export function logDataRequest(id, table) {
    return (dispatch) => {
        dispatch(logData());

        // API REQUEST
        return axios.post('/api/chart/logData',{
            "id": id,
            "tables": table
        })
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS!', response);
                const data = response.data;
                dispatch(logDataSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(logDataFailure());
            });
    };
}

export function logData() {
    return {
        type: GET_LOG_DATA
    };
}

export function logDataSuccess(response) {
    return {
        type: GET_LOG_DATA_SUCCESS,
        data: response
    };
}

export function logDataFailure() {
    return {
        type: GET_LOG_DATA_FAILURE
    };
}
