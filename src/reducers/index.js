import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';

const rootReducer = combineReducers({
	error: ErrorReducer,
	selectedCoin: SelectedCoinReducer,
});

export default rootReducer;
