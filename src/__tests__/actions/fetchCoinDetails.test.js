import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from 'Actions/types';
import * as actions from 'Actions';
import mockData from '../../__mocks__/currency';
import _ from 'lodash';
import config from 'Config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

describe('creates an action to fetch order details', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetches coin details that are not for testing and not only for white labels', async () => {
    const payload = _.filter(mockData, { has_enabled_pairs: true });
    const expectedActions = [{ type: types.COINS_INFO, payload }];
    const store = mockStore();

    mock.onGet(`${config.API_BASE_URL}/currency/`).reply(200, mockData);

    await store.dispatch(actions.fetchCoinDetails());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
