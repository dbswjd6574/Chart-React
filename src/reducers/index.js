import mongo from './getMongo';
import dataset from './dataset';
import { combineReducers } from 'redux';

export default combineReducers({
    dataset,
    mongo
});