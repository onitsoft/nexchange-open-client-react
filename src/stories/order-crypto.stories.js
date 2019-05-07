import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import order from '../__mocks__/order';
import orderExpired from '../__mocks__/orderExpired';

import OrderMain from '../components/Order/OrderMain/OrderMain';

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

const orderPaidUnconfirmed = { ...order, status_name: [[12, STATUS_CODES[12]]] };
const orderPaid = { ...order, status_name: [[13, STATUS_CODES[13]]] };
const orderPreRelease = { ...order, status_name: [[14, STATUS_CODES[14]]] };
const orderRelease = { ...order, status_name: [[15, STATUS_CODES[15]]] };
const orderCompleted = { ...order, status_name: [[16, STATUS_CODES[16]]] };

storiesOf('Order states (crypto)', module)
  .addDecorator(story => (
    <BrowserRouter>
      <div id="order" className="order-crypto">
        <div className="container">
          <div id="team-members" className="row">
            {story()}
          </div>
        </div>
      </div>
    </BrowserRouter>
  ))
  .add('initial (11)', () => <OrderMain order={order} />)
  .add('paid unconfirmed (12)', () => <OrderMain order={orderPaidUnconfirmed} />)
  .add('paid (13)', () => <OrderMain order={orderPaid} />)
  .add('pre-release (14)', () => <OrderMain order={orderPreRelease} />)
  .add('release (15)', () => <OrderMain order={orderRelease} />)
  .add('completed (16)', () => <OrderMain order={orderCompleted} />)
  .add('expired', () => <OrderMain order={orderExpired} />);
