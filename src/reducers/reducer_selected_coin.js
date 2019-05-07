import { COIN_SELECTED } from 'Actions/types';

const initialState = {
  deposit: null,
  receive: null,
  prev: {
    deposit: null,
    receive: null,
  },
  lastSelected: 'deposit',
  selectedByUser: {
    deposit: false,
    receive: false,
  },
};

export default (state = initialState, action) => {
  if (action.type === COIN_SELECTED) {
    const { selectedCoins, pairs } = action.payload;

    if (selectedCoins.deposit === selectedCoins.receive) {
      const prevReceive = selectedCoins.prev.receive;
      const prevDeposit = selectedCoins.prev.deposit;

      if (!pairs[prevReceive] || !pairs[prevReceive][prevDeposit]) {
        selectedCoins.deposit = prevDeposit;
        selectedCoins.receive = prevReceive;
      } else {
        selectedCoins.deposit = prevReceive;
        selectedCoins.receive = prevDeposit;
      }
    }

    selectedCoins.prev.deposit = selectedCoins.deposit;
    selectedCoins.prev.receive = selectedCoins.receive;

    return selectedCoins;
  }

  return state;
};
