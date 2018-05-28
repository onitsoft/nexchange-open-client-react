import reducer from '../../reducers/reducer_price_fetched';
import * as types from '../../actions/types';
import mockData from '../../__mocks__/get_price';

describe('price reducer', () => {
  const initialState = {
    deposit: '...',
    receive: '...',
    lastEdited: 'deposit',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle PRICE_FETCHED', () => {
    const action = {
      type: types.PRICE_FETCHED,
      payload: mockData,
    };

    expect(reducer([], action)).toEqual(mockData);
  });
});
