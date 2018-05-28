import reducer from '../../reducers/reducer_pairs';
import * as types from '../../actions/types';
import mockData from '../../__mocks__/pair';

describe('pairs reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle PAIRS_FETCHED', () => {
    const action = {
      type: types.PAIRS_FETCHED,
      payload: mockData,
    };

    expect(reducer(null, action)).toEqual(mockData);
  });
});
