import {
    GET_DATA_SET_LIST,
    GET_DATA_SET_LIST_SUCCESS,
    GET_DATA_SET_LIST_FAILURE,
    GET_LOG_DATA,
    GET_LOG_DATA_SUCCESS,
    GET_LOG_DATA_FAILURE,
    GET_FIELD_LIST,
    GET_FIELD_LIST_SUCCESS,
    GET_FIELD_LIST_FAILURE,
    GET_STATUS,
    GET_SESSION_ID_SUCCESS,
    GET_SESSION_ID_FAILURE,
    QUERY_FAILURE,
    QUERY_SUCCESS
} from './ActionTypes';
import axios from 'axios';

export function datasetListRequest() {
    return (dispatch) => {
        dispatch(datasetList());

        // API REQUEST
        return axios.post('/api/chart/datasetList')
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

export function fieldListRequest(query) {
    return (dispatch) => {
        dispatch(fieldList());

        // API REQUEST
        return axios.post('/api/chart/fieldList',query)
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS fieldList!', response);
                dispatch(sessionIdSuccess(response.data.sessionid));
            }).catch((error) => {
                // FAILED
                dispatch(sessionIdFailure());
            });
    };
}

export function statusRequest(query) {
    console.log('ResultChart.statusRequest');
    return (dispatch) => {
        dispatch(status());

        // API REQUEST
        return axios.post('/api/chart/status',query)
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS status!', response);
                dispatch(querySuccess(response.data));
            }).catch((error) => {
                // FAILED
                dispatch(queryFailure());
            });
    };
}

export function fieldList() {
    return {
        type: GET_FIELD_LIST
    };
}

export function fieldListSuccess(response) {
    return {
        type: GET_FIELD_LIST_SUCCESS,
        data: response
    };
}

export function fieldListFailure() {
    return {
        type: GET_FIELD_LIST_FAILURE
    };
}

export function status() {
    return {
        type: GET_STATUS
    };
}

export function sessionIdSuccess(response) {
    return {
        type: GET_SESSION_ID_SUCCESS,
        data: response
    };
}

export function sessionIdFailure() {
    return {
        type: GET_SESSION_ID_FAILURE
    };
}


export function logDataRequest(id, table) {
    return (dispatch) => {
        dispatch(logData());

        // API REQUEST
        return axios.post('/api/chart/logData',{
            "id": id,
            "tables": table,
            "sessionId": (new Date).getTime()
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

export function queryRequest(query) {
    return (dispatch) => {
        // API REQUEST
        return axios.post('/api/chart/query',query)
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS query!', response);
                dispatch(sessionIdSuccess(response.data.sessionid));
            }).catch((error) => {
                // FAILED
                dispatch(sessionIdFailure());
            });
    };
}

export function querySuccess(response) {
    return {
        type: QUERY_SUCCESS,
        data: response
    };
}

export function queryFailure() {
    return {
        type: QUERY_FAILURE
    };
}