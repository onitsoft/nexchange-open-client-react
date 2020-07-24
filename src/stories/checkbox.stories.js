import React from 'react';
import Checkbox from '../components/Order/OrderMain/OrderState/OrderInitial/Checkbox/Checkbox';
import '../css/index.scss';

export default {
  title: 'Checkboxes',
};

export const TermsAndConditions = () => <Checkbox name="checkboxTC" order="order.iAgreedTC" />;

TermsAndConditions.story = {
  name: 'Terms and Conditions',
};

export const Acknowledge = () => <Checkbox type="checkboxKYC" order="order.iAcknowledgeKYC" />;

Acknowledge.story = {
  name: 'Acknowledge ',
};
