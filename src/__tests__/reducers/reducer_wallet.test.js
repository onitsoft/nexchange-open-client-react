import reducer from '../../reducers/reducer_wallet';
import * as types from 'Actions/types';

describe('wallet reducer', () => {
  const initialState = {
    userAddress: {},
    valid: false,
    show: false,
    forced: false,
    success: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_WALLET', () => {
    const payload = { address: 'address' };
    const action = {
      type: types.SET_WALLET,
      payload,
    };

    expect(reducer(initialState, action)).toEqual({
      forced: false,
      show: false,
      success: false,
      userAddress: { address: 'address' },
      valid: false,
    });
  });
});
