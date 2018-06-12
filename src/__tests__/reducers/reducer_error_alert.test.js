import reducer from '../../reducers/reducer_error_alert';
import * as types from 'Actions/types';

describe('error alert reducer', () => {
  const initialState = {
    show: false,
    message: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ERROR_ALERT', () => {
    const payload = {
      show: true,
      message: 'alert message',
    };

    const action = {
      type: types.ERROR_ALERT,
      payload,
    };

    expect(reducer(initialState, action)).toEqual(payload);
  });
});
