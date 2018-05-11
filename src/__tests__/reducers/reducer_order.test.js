import reducer from '../../reducers/reducer_order';
import * as types from '../../actions/types';
import mockData from '../__mocks__/order';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle FETCH_ORDER', () => {
    const action = {
      type: types.FETCH_ORDER,
      payload: mockData
    };

    expect(reducer(null, action)).toEqual(mockData);
  });
});