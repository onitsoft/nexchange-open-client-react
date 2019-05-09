import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import order from '../__mocks__/order';
import orderExpired from '../__mocks__/orderExpired';

import Order from '../components/Order/Order';

import '../css/index.scss';


window.$ = window.jQuery = require('jquery');
require('../js/bootstrap.min.js');

const STATUS_CODES = {
  0: 'CANCELLED',
  8: 'REFUNDED',
  11: 'INITIAL',
  12: 'PAID_UNCONFIRMED',
  13: 'PAID',
  14: 'PRE_RELEASE',
  15: 'RELEASE',
  16: 'COMPLETED',
};

// A super-simple mock of a redux store
const store = {
  getState: () => ({ order, email: '' }),
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

const match = {
  params: {
    orderRef: 'OV2O6C',
  },
};

storiesOf('Order states full (crypto)', module)
  .addDecorator(story => (
    <Provider store={store}>
      <BrowserRouter initialEntries={['/order/asdasd']}>{story()}</BrowserRouter>
    </Provider>
  ))
  .add('initial (11)', () => <Order match={match} />);
