import { combineReducers } from 'redux';
import ErrorReducer from './reducer_error_alert';
import SelectedCoinReducer from './reducer_selected_coin';
import CoinsInfoReducer from './reducer_coins_info';
import PriceFetchReducer from './reducer_price_fetched';
import WalletReducer from './reducer_wallet';
import DestinationTagReducer from './reducer_destination_tag';
import PaymentIdReducer from './reducer_payment_id';
import MemoReducer from './reducer_memo';
import PairsReducer from './reducer_pairs';
import OrderReducer from './reducer_order';
import KYCReducer from './reducer_kyc';
import EmailReducer from './reducer_email';
import OrderModeReducer from './reducer_order_mode';
import OrderBookReducer from './reducer_order_book';

const rootReducer = combineReducers({
  error: ErrorReducer,
  selectedCoin: SelectedCoinReducer,
  coinsInfo: CoinsInfoReducer,
  price: PriceFetchReducer,
  wallet: WalletReducer,
  destinationTag: DestinationTagReducer,
  paymentId: PaymentIdReducer,
  memo: MemoReducer,
  pairs: PairsReducer,
  order: OrderReducer,
  kyc: KYCReducer,
  email: EmailReducer,
  orderMode: OrderModeReducer,
  orderBook: OrderBookReducer
});

export default rootReducer;
