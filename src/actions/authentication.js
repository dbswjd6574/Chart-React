import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function dataRequest() {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(request());

        // API REQUEST
        return axios.post('/api/chart/getData')
            .then((response) => {
                // SUCCEED
                dispatch(requestSuccess(response));
            }).catch((error) => {
                // FAILED
                dispatch(requestFailure());
            });
    };
}

export function request() {
    return {
        type: GET_DATA
    };
}

export function requestSuccess(response) {
    return {
        type: GET_DATA_SUCCESS,
        response
    };
}

export function requestFailure() {
    return {
        type: GET_DATA_FAILURE
    };
}
