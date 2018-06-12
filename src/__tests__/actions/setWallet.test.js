import * as types from 'Actions/types';
import * as actions from 'Actions';

it('creates an action to set wallet', () => {
  const payload = {
    address: 'address',
    valid: false,
    show: true,
  };
  const expectedAction = { type: types.SET_WALLET, payload };

  expect(actions.setWallet(payload)).toEqual(expectedAction);
});
