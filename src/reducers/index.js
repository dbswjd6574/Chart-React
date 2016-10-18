import authentication from './authentication';
import mongo from './getMongo';
import dataset from './dataset';
import sunburstData from './sunburstData'
import { combineReducers } from 'redux';

export default combineReducers({
    dataset,
    authentication,
    mongo,
    sunburstData
});