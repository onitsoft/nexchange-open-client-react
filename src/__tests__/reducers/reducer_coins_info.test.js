import reducer from '../../reducers/reducer_coins_info';
import * as types from 'Actions/types';
import mockData from '../../__mocks__/currency';

describe('coins info reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle COINS_INFO', () => {
    const action = {
      type: types.COINS_INFO,
      payload: mockData,
    };

    expect(reducer([], action)).toEqual(mockData);
  });
});
