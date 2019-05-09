import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import order from '../__mocks__/orderFiat';
import orderExpired from '../__mocks__/orderFiatExpired';
import kyc from '../__mocks__/kyc';

import OrderMain from '../components/Order/OrderMain/OrderMain';

import '../css/index.scss';


import { STATUS_CODES } from '../statusCodes';

window.$ = window.jQuery = require('jquery');
require('../js/bootstrap.min.js');

const orderPaidUnconfirmed = { ...order, status_name: [[12, STATUS_CODES[12]]] };
const orderPaid = { ...order, status_name: [[13, STATUS_CODES[13]]] };
const orderPreRelease = { ...order, status_name: [[14, STATUS_CODES[14]]] };
const orderRelease = { ...order, status_name: [[15, STATUS_CODES[15]]] };
const orderCompleted = { ...order, status_name: [[16, STATUS_CODES[16]]] };

const store = {
  getState: () => {
    return {
      kyc,
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

storiesOf('Order states (fiat)', module)
  .addDecorator(story => (
    <Provider store={store}>
      <BrowserRouter>
        <div id="order" className="order-crypto">
          <div className="container">
            <div id="team-members" className="row">
              {story()}
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  ))
  .add('initial (11)', () => <OrderMain order={order} />)
  .add('paid unconfirmed (12)', () => <OrderMain order={orderPaidUnconfirmed} />)
  .add('paid (13)', () => <OrderMain order={orderPaid} />)
  .add('pre-release (14)', () => <OrderMain order={orderPreRelease} />)
  .add('release (15)', () => <OrderMain order={orderRelease} />)
  .add('completed (16)', () => <OrderMain order={orderCompleted} />)
  .add('expired', () => <OrderMain order={orderExpired} />);
