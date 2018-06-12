import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from 'Actions/types';
import * as actions from 'Actions';
import mockData from '../../__mocks__/order';
import config from 'Config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('creates an action to fetch order details', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates SET_ORDER with order details', async () => {
    const expectedActions = [{ type: types.SET_ORDER, order: mockData }];
    const store = mockStore();

    mock.onGet(`${config.API_BASE_URL}/orders/123ASD/`).reply(200, mockData);

    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SET_ORDER with 404 status', async () => {
    const expectedActions = [{ type: types.SET_ORDER, order: 404 }];
    const store = mockStore();

    mock.onGet(`${config.API_BASE_URL}/orders/123ASD/`).reply(404);

    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates SET_ORDER with 429 status', async () => {
    const expectedActions = [{ type: types.SET_ORDER, order: 429 }];
    const store = mockStore();

    mock.onGet(`${config.API_BASE_URL}/orders/123ASD/`).reply(429);

    await store.dispatch(actions.fetchOrder('123ASD'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
