import {GET_DATA_SUCCESS, GET_DATA_FAILURE} from './ActionTypes';
import axios from 'axios';

export function requestSunburstData(){
    return (dispatch) => {
        return axios.get('./sunburstData.json')
            .then((response) => {
                // SUCCEED
                let data = response;
                dispatch(requestSuccess(data));
            }).catch((error) => {
                // FAILED
                dispatch(requestFailure());
            });
    }
}

export function requestSuccess(response) {
    return {
        type: GET_DATA_SUCCESS,
        data: response
    };
}

export function requestFailure() {
    return {
        type: GET_DATA_FAILURE
    };
}