import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import pair from '../__mocks__/pair';
import coinsInfo from '../__mocks__/currency';
import CoinSelector from '../containers/CoinSelector';
import preparePairs from '../helpers/preparePairs';
import '../css/index.scss';

const store = {
  getState: () => {
    return {
      selectedCoin: {
        deposit: 'BTC',
        receive: 'EUR',
      },
      pairs: preparePairs(pair),
      coinsInfo,
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

storiesOf('Coin selector', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <CoinSelector type="deposit" />);
