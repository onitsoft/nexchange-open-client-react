import reducer from '../../reducers/reducer_order';
import * as types from 'Actions/types';
import mockData from '../../__mocks__/order';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle SET_ORDER', () => {
    const action = {
      type: types.SET_ORDER,
      order: mockData,
    };

    expect(reducer(null, action)).toEqual(mockData);
  });
});
