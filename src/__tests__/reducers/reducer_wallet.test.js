import reducer from '../../reducers/reducer_wallet';
import * as types from 'Actions/types';

describe('wallet reducer', () => {
  const initialState = {
    address: '',
    valid: false,
    show: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_WALLET', () => {
    const payload = {
      address: 'address',
      valid: false,
      show: true,
    };

    const action = {
      type: types.SET_WALLET,
      payload,
    };

    expect(reducer(initialState, action)).toEqual(payload);
  });
});
