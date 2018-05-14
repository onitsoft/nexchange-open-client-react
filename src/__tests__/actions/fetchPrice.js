// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import * as types from '../../actions/types';
// import * as actions from '../../actions';
// import mockData from '../__mocks__/currency';
// import _ from 'lodash';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// const mock = new MockAdapter(axios);

// describe('creates an action to fetch price details', () => {
//   afterEach(() => {
//     mock.reset();
//   });

//   it('fetches price for BHCGBP and quote of 100 successfully', async () => {
//     const expectedActions = [{ type: types.COINS_INFO, payload: {} }];
//     const store = mockStore();

//     mock.onGet('https://api.nexchange.io/en/api/v1/get_price/BCHGBP/?amount_quote=100').reply(200, mockData);

//     await store.dispatch(actions.fetchPrice({ pair: 'BCHGBP', deposit: 100 }));

//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });
