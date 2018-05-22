import React from 'react';
import { storiesOf } from '@storybook/react';
import coinsInfo from '../__mocks__/currency';
import CoinsDropdown from '../containers/CoinsDropdown';
import '../css/index.scss';

storiesOf('Coin selector (deposit)', module).add('default', () => (
  <CoinsDropdown type="deposit" coinsInfo={coinsInfo} onClick={() => {}} />
));

storiesOf('Coin selector (receive)', module).add('default', () => (
  <CoinsDropdown type="receive" coinsInfo={coinsInfo} onClick={() => {}} />
));
