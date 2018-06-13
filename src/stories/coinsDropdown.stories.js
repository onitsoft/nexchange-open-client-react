import React from 'react';
import { storiesOf } from '@storybook/react';
import coinsInfo from '../__mocks__/currency';
import CoinsDropdown from '../components/Home/Hero/ExchangeWidget/CoinInput/CoinSelector/CoinsDropdown/CoinsDropdown';
import '../css/index.scss';

storiesOf('Coin selector', module)
  .add('deposit selector', () => <CoinsDropdown type="deposit" coinsInfo={coinsInfo} onClick={() => {}} />)
  .add('receive selector', () => <CoinsDropdown type="receive" coinsInfo={coinsInfo} onClick={() => {}} />);
