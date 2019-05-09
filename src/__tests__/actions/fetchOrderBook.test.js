import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from 'Actions/types';
import * as actions from 'Actions';
import mockDataSell from '../../__mocks__/orderbook_sell';
import mockDataBuy from '../../__mocks__/orderbook_buy';
import config from 'Config';
import generateDepth from 'Utils/generateDepth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('creates an action to fetch orderbook', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates SET_ORDER with order details', async () => {
    const expectedActions = [
      { 
        type: types.ORDER_BOOK_DATA_FETCHED, 
        orderBook: {
          order_type: 'BUY',
          quantity: '',
          limit_rate: '',
          sellDepth: generateDepth(mockDataSell.results, 'SELL'),
          buyDepth: generateDepth(mockDataBuy.results, 'BUY'),
          history: [],
          myOrders: [],
      }
    },
    { 
      type: types.ORDER_BOOK_DATA_FETCHED, 
      orderBook: {
        order_type: 'BUY',
        quantity: '',
        limit_rate: '',
        sellDepth: generateDepth(mockDataSell.results, 'SELL'),
        buyDepth: generateDepth(mockDataBuy.results, 'BUY'),
        history: [],
        myOrders: [],
      }
    }
    ];
    const store = mockStore();

    mock.onGet(`${config.API_BASE_URL}/limit_order/?pair=DOGEETH&book_status=OPEN&order_type=SELL`).reply(200, mockDataSell);
    mock.onGet(`${config.API_BASE_URL}/limit_order/?pair=DOGEETH&book_status=OPEN&order_type=BUY`).reply(200, mockDataBuy);
    const payload = {
      orderBook: {
        order_type: 'BUY',
        quantity: '',
        limit_rate: '',
        sellDepth: [],
        buyDepth: [],
        history: [],
        myOrders: [],
      }, 
      pair: 'DOGEETH',
      status: 'OPEN',
      type: 'BUY'
    }
    await store.dispatch(actions.fetchOrderBook(payload));
    payload.type = 'SELL';
    await store.dispatch(actions.fetchOrderBook(payload));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
