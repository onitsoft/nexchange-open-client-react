import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import * as actions from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('creates an action to select coin', () => {
  it('creates COIN_SELECTED and SET_WALLET when setting selected coin', () => {
    const expectedActions = [
      {
        type: types.COIN_SELECTED,
        payload: {
          deposit: 'BTC',
          receive: 'XVG',
          prev: {
            deposit: 'BTC',
            receive: 'ETH',
          },
          lastSelected: 'deposit',
        },
      },
      {
        type: types.SET_WALLET,
        payload: {
          address: '',
          valid: false,
          show: false,
        },
      },
    ];
    const store = mockStore();

    store.dispatch(
      actions.selectCoin({
        deposit: 'BTC',
        receive: 'XVG',
        prev: {
          deposit: 'BTC',
          receive: 'ETH',
        },
        lastSelected: 'deposit',
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
  });
});
