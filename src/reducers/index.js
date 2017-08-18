import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin.js';
import CoinsInfoReducer from './reducer_coins_info';

const rootReducer = combineReducers({
	error: ErrorReducer,
	selectedCoin: SelectedCoinReducer,
	coinsInfo: CoinsInfoReducer,
});

export default rootReducer;
