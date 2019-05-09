import reducer from '../../reducers/reducer_selected_coin';
import * as types from 'Actions/types';

describe('selected coin reducer', () => {
  const initialState = {
    deposit: null,
    receive: null,
    prev: {
      deposit: null,
      receive: null,
    },
    lastSelected: 'deposit',
    selectedByUser: {
      deposit: false,
      receive: false,
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle COIN_SELECTED', () => {
    const payload = {
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
    };

    const action = {
      type: types.COIN_SELECTED,
      payload,
    };

    expect(reducer(initialState, action)).toEqual(payload.selectedCoins);
  });
});
