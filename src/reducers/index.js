import authentication from './authentication';
import mongo from './getMongo';
import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    mongo
});