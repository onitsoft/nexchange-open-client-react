import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from 'Actions/types';
import * as actions from 'Actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('creates an action to select coin', () => {
  it('creates COIN_SELECTED and SET_WALLET when setting selected coin', () => {
    const expectedActions = [
      {
        type: types.COIN_SELECTED,
        payload: {
          selectedCoins: {
            deposit: 'BTC',
            receive: 'XVG',
            prev: {
              deposit: 'BTC',
              receive: 'ETH',
            },
            lastSelected: 'deposit',
          },
          pairs: undefined,
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
