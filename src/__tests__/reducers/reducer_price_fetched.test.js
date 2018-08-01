import reducer from '../../reducers/reducer_price_fetched';
import * as types from 'Actions/types';
import mockData from '../../__mocks__/get_price';

describe('price reducer', () => {
  const initialState = {
    deposit: '...',
    receive: '...',
    min_amount_quote: '...',
    max_amount_quote: '...',
    min_amount_base: '...',
    max_amount_base: '...',
    fetching: true,
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
