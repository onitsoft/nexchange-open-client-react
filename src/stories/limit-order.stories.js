import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import limitorder from '../__mocks__/limitorder';

import OrderMain from '../components/Order/OrderMain/OrderMain';

import '../css/index.scss';

window.$ = window.jQuery = require('jquery');
require('../js/bootstrap.min.js');

storiesOf('Order states (crypto)', module)
  .addDecorator(story => (
    <BrowserRouter>
      <BrowserRouter initialEntries={['/order/asdasd']}>{story()}</BrowserRouter>
    </BrowserRouter>
  ))
  .add('new (1)', () => <OrderMain order={limitorder} />)
  .add('open (2)', () => <OrderMain order={limitorder} />)
  .add('closed (3)', () => <OrderMain order={orderPaid} />)
