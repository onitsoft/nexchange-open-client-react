import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';
import CoinsInfoReducer from './reducer_coins_info';
import UpdateAmountsReducer from './reducer_update_amounts';
import PriceReducer from './reducer_price';

const rootReducer = combineReducers({
	error: ErrorReducer,
	amounts: UpdateAmountsReducer,
	selectedCoin: SelectedCoinReducer,
	coinsInfo: CoinsInfoReducer,
});

export default rootReducer;
