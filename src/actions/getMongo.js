import { GET_DATA, GET_M_DATA_SUCCESS, GET_DATA_FAILURE } from './ActionTypes';
import axios from 'axios';

export function dataRequest() {
    console.log("mongoDataRequest");
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(request());

        // API REQUEST
        return axios.post('/api/dash/dashBoard')
            .then((response) => {
                // SUCCEED
                console.log("tt", response.data);
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
        type: GET_M_DATA_SUCCESS,
        data: response.data
    };
}

export function requestFailure() {
    return {
        type: GET_DATA_FAILURE
    };
}