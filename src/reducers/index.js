import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';
import CoinsInfoReducer from './reducer_coins_info';
import UpdateAmountsReducer from './reducer_update_amounts';
import PriceFetchReducer from './reducer_price_fetched';
import WalletReducer from './reducer_wallet';

const rootReducer = combineReducers({
	error: ErrorReducer,
	amounts: UpdateAmountsReducer,
	selectedCoin: SelectedCoinReducer,
	coinsInfo: CoinsInfoReducer,
	price: PriceFetchReducer,
	wallet: WalletReducer
});

export default rootReducer;
