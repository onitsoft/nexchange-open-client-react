import * as types from '../../actions/types';
import * as actions from '../../actions';

it('creates an action to set alert', () => {
  const payload = { show: false, message: null };
  const expectedAction = { type: types.ERROR_ALERT, payload };

  expect(actions.errorAlert(payload)).toEqual(expectedAction);
});
