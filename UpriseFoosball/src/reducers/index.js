import { combineReducers } from 'redux';
import matchesReducer from './matches.reducer'

export default combineReducers({
	matches:matchesReducer
});