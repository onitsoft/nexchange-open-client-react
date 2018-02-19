import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';
import CoinsInfoReducer from './reducer_coins_info';
import PriceFetchReducer from './reducer_price_fetched';
import WalletReducer from './reducer_wallet';
import PairsReducer from './reducer_pairs';

const rootReducer = combineReducers({
	error: ErrorReducer,
	selectedCoin: SelectedCoinReducer,
	coinsInfo: CoinsInfoReducer,
	price: PriceFetchReducer,
	wallet: WalletReducer,
	pairs: PairsReducer
});

export default rootReducer;
