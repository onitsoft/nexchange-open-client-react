import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actions/types';
import * as actions from '../../actions';
import mockData from '../__mocks__/order';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('creates an action to fetch order details', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_ORDER with order details', async () => {
    const expectedActions = [{ type: types.FETCH_ORDER, payload: mockData }];
    const store = mockStore();

    mock.onGet('https://api.nexchange.io/en/api/v1/orders/123ASD/').reply(200, mockData);
    
    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_ORDER with 404 status', async () => {
    const expectedActions = [{ type: types.FETCH_ORDER, payload: 404 }];
    const store = mockStore();

    mock.onGet('https://api.nexchange.io/en/api/v1/orders/123ASD/').reply(404);
    
    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_ORDER with 429 status', async () => {
    const expectedActions = [{ type: types.FETCH_ORDER, payload: 429 }];
    const store = mockStore();

    mock.onGet('https://api.nexchange.io/en/api/v1/orders/123ASD/').reply(429);
    
    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});


