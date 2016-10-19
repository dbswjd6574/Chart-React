import {
    GET_DATA_SET_LIST_SUCCESS,
    GET_DATA_SET_LIST_FAILURE,
    GET_TOTAL_COUNT_SUCCESS,
    GET_TOTAL_COUNT_FAILURE,
    GET_FIELD_LIST_SUCCESS,
    GET_FIELD_LIST_FAILURE,
    GET_SESSION_ID_SUCCESS,
    GET_SESSION_ID_FAILURE,
    QUERY_FAILURE,
    QUERY_SUCCESS
} from './ActionTypes';
import axios from 'axios';

export function datasetListRequest() {
    return (dispatch) => {
        // API REQUEST
        return axios.post('/api/chart/datasetList')
            .then((response) => {
                // SUCCEED
                const data = response.data;
                dispatch(datasetListSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(datasetListFailure());
            });
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
        // API REQUEST
        return axios.post('/api/chart/fieldList',query)
            .then((response) => {
                // SUCCEED
                dispatch(sessionIdSuccess(response.data.sessionid));
            }).catch((error) => {
                // FAILED
                dispatch(sessionIdFailure());
            });
    };
}

export function statusRequest(query) {
    return (dispatch) => {
        // API REQUEST
        return axios.post('/api/chart/status',query)
            .then((response) => {
                // SUCCEED
                dispatch(querySuccess(response.data));
            }).catch((error) => {
                // FAILED
                dispatch(queryFailure());
            });
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


export function totalCountRequest(query) {
    return (dispatch) => {
        // API REQUEST
        return axios.post('/api/chart/status',query)
            .then((response) => {
                // SUCCEED
                const data = response.data;
                dispatch(totalCountSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(totalCountFailure());
            });
    };
}


export function totalCountSuccess(response) {
    return {
        type: GET_TOTAL_COUNT_SUCCESS,
        data: response
    };
}

export function totalCountFailure() {
    return {
        type: GET_TOTAL_COUNT_FAILURE
    };
}

export function queryRequest(query) {
    return (dispatch) => {
        // API REQUEST
        return axios.post('/api/chart/query',query)
            .then((response) => {
                // SUCCEED
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