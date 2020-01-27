import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '../components/Order/OrderMain/OrderState/OrderInitial/Checkbox/Checkbox';
import '../css/index.scss';

storiesOf('Checkboxes', module)
  .add('Terms and Conditions', () => <Checkbox name="checkboxTC" order='order.iAgreedTC' />)
  .add('Acknowledge ', () => <Checkbox type="checkboxKYC" order='order.iAcknowledgeKYC' />);
