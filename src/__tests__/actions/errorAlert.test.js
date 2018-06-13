import * as types from 'Actions/types';
import * as actions from 'Actions';

it('creates an action to set alert', () => {
  const payload = { show: false, message: null };
  const expectedAction = { type: types.ERROR_ALERT, payload };

  expect(actions.errorAlert(payload)).toEqual(expectedAction);
});
