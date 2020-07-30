import React from 'react';
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

const orderInitial = {...order, status_name:[[11, STATUS_CODES[11]]]};
const orderPaidUnconfirmed = { ...order, status_name: [[12, STATUS_CODES[12]]] };
const orderPaid = { ...order, status_name: [[13, STATUS_CODES[13]]] };
const orderPreRelease = { ...order, status_name: [[14, STATUS_CODES[14]]] };
const orderRelease = { ...order, status_name: [[15, STATUS_CODES[15]]] };
const orderCompleted = { ...order, status_name: [[16, STATUS_CODES[16]]] };

export default {
  title: 'Order states (crypto)',

  decorators: [
    story => (
      <BrowserRouter>
        <div id="order" className="order-crypto">
          <div className="container">
            <div id="team-members" className="row">
              {story()}
            </div>
          </div>
        </div>
      </BrowserRouter>
    ),
  ],
};

export const Initial11 = () => <OrderMain order={orderInitial} />;

Initial11.story = {
  name: 'initial (11)',
};

export const PaidUnconfirmed12 = () => <OrderMain order={orderPaidUnconfirmed} />;

PaidUnconfirmed12.story = {
  name: 'paid unconfirmed (12)',
};

export const Paid13 = () => <OrderMain order={orderPaid} />;

Paid13.story = {
  name: 'paid (13)',
};

export const PreRelease14 = () => <OrderMain order={orderPreRelease} />;

PreRelease14.story = {
  name: 'pre-release (14)',
};

export const Release15 = () => <OrderMain order={orderRelease} />;

Release15.story = {
  name: 'release (15)',
};

export const Completed16 = () => <OrderMain order={orderCompleted} />;

Completed16.story = {
  name: 'completed (16)',
};

export const Expired = () => <OrderMain order={orderExpired} />;

Expired.story = {
  name: 'expired',
};
