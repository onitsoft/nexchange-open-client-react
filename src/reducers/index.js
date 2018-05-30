import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';
import CoinsInfoReducer from './reducer_coins_info';
import PriceFetchReducer from './reducer_price_fetched';
import WalletReducer from './reducer_wallet';
import PairsReducer from './reducer_pairs';
import OrderReducer from './reducer_order';
import KYCReducer from './reducer_kyc';
import EmailReducer from './reducer_email';

const rootReducer = combineReducers({
  error: ErrorReducer,
  selectedCoin: SelectedCoinReducer,
  coinsInfo: CoinsInfoReducer,
  price: PriceFetchReducer,
  wallet: WalletReducer,
  pairs: PairsReducer,
  order: OrderReducer,
  kyc: KYCReducer,
  email: EmailReducer,
});

export default rootReducer;
