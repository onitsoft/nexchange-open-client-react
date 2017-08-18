import { combineReducers } from 'redux';
// import { reducer as FormReducer } from 'redux-form' 
import ErrorReducer from './reducer_error_alert';

const rootReducer = combineReducers({
	error: ErrorReducer,
	// form: FormReducer,
});

export default rootReducer;
