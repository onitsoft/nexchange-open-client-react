import * as types from '../../actions/types';
import * as actions from '../../actions';

it('creates an action to set wallet', () => {
  const payload = {
    address: 'address',
    valid: false,
    show: true,
  };
  const expectedAction = { type: types.SET_WALLET, payload };

  expect(actions.setWallet(payload)).toEqual(expectedAction);
});
