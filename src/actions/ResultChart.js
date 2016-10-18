import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function dataRequest() {
    return (dispatch) => {
        dispatch(request());

        // API REQUEST
        return axios.post('/api/chart/dataset')
            .then((response) => {
                // SUCCEED
                console.info('SUCCESS!', response);
                const data = response.data;
                dispatch(requestSuccess(data));
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
        data: response.datasetList
    };
}

export function requestFailure() {
    return {
        type: GET_DATA_FAILURE
    };
}
