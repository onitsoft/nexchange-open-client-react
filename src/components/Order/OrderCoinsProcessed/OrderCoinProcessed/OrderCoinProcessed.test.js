import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import OrderCoinProcessed from './OrderCoinProcessed';
import order from 'Mocks/order';
import orderFiat from 'Mocks/orderFiat';
window.$ = window.jQuery = require('jquery');

const axiosMock = new MockAdapter(axios);

describe('OrderCoinProcessed', () => {
  beforeEach(() => {
    const mockDataOrder = {
      amount_base: 16030.0,
      amount_quote: 0.45302314,
      timestamp: 1533112989.566057,
      price: 2.826e-5,
      pair: {
        base: order.pair.base.code,
        quote: order.pair.quote.code,
      },
      max_amount_base: 150364.7264127,
      max_amount_quote: 5.33397606,
      min_amount_base: 150.0,
      min_amount_quote: 0.00613576,
    };
    const pairOrder = `${order.pair.base.code}${order.pair.quote.code}`;
    axiosMock.onGet(`https://api.nexchange.io/en/api/v1/get_price/${pairOrder}/`).reply(200, mockDataOrder);

    const mockDataOrderFiat = {
      amount_base: 16030.0,
      amount_quote: 0.45302314,
      timestamp: 1533112989.566057,
      price: 2.826e-5,
      pair: {
        base: orderFiat.pair.base.code,
        quote: orderFiat.pair.quote.code,
      },
      max_amount_base: 150364.7264127,
      max_amount_quote: 5.33397606,
      min_amount_base: 150.0,
      min_amount_quote: 0.00613576,
    };
    const pairOrderFiat = `${orderFiat.pair.base.code}${orderFiat.pair.quote.code}`;
    axiosMock.onGet(`https://api.nexchange.io/en/api/v1/get_price/${pairOrderFiat}/`).reply(200, mockDataOrderFiat);
  });

  it('renders correctly and updates props (deposit and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly and passes payment id to order initial', () => {
    const order = {
      "amount_base": "2.79715421",
      "is_default_rule": false,
      "unique_reference": "OB9UVL",
      "amount_quote": "0.05000000",
      "pair": {
          "name": "XMRBTC",
          "base": {
              "code": "XMR",
              "name": "monero",
              "min_confirmations": 10,
              "is_crypto": true,
              "minimal_amount": "0.10000000",
              "maximal_amount": "15.00000000",
              "is_base_of_enabled_pair": true,
              "is_quote_of_enabled_pair": true,
              "has_enabled_pairs": true,
              "is_base_of_enabled_pair_for_test": true,
              "is_quote_of_enabled_pair_for_test": true,
              "has_enabled_pairs_for_test": true,
              "withdrawal_fee": "0.01100000"
          },
          "quote": {
              "code": "BTC",
              "name": "bitcoin",
              "min_confirmations": 2,
              "is_crypto": true,
              "minimal_amount": "0.00100000",
              "maximal_amount": "5.00000000",
              "is_base_of_enabled_pair": true,
              "is_quote_of_enabled_pair": true,
              "has_enabled_pairs": true,
              "is_base_of_enabled_pair_for_test": true,
              "is_quote_of_enabled_pair_for_test": true,
              "has_enabled_pairs_for_test": true,
              "withdrawal_fee": "0.00050000"
          },
          "fee_ask": 0.01,
          "fee_bid": 0.01
      },
      "withdraw_address": {
          "type": "W",
          "name": "",
          "address": "48RMNAj52Haj8GWcLW5ehi9ca1u8F7HrUX4mTNLJLiAacRVarB6KJ8wHdZFetHsvzcAXRcLs99etSVCkmJ5Cuv8kNq51PvM",
          "currency_code": "XMR",
          "destination_tag": null,
          "payment_id": "420fa29b2d9a49f5"
      },
      "deposit_address": {
          "type": "D",
          "name": "",
          "address": "BTC_0_HACUB8",
          "currency_code": "BTC",
          "destination_tag": null,
          "payment_id": null
      },
      "created_on": "2018-10-01T07:51:39.480190Z",
      "from_default_rule": false,
      "payment_window": 15,
      "payment_deadline": "2018-10-01T08:06:39.480190Z",
      "kyc_deadline": null,
      "status_name": [
          [
              11,
              "INITIAL"
          ]
      ],
      "transactions": [],
      "referral_code": [
          {
              "code": "REZCI9KXJK5",
              "created_on": "2018-10-01T07:51:39.003237Z",
              "modified_on": "2018-10-01T07:51:39.003288Z"
          }
      ],
      "withdrawal_fee": 0.011,
      "withdrawal_fee_quote": 0.00019585819,
      "user_provided_amount": 1,
      "payment_url": null,
      "token": "Qft5l4T7UzkdHrAP4UrSwlvsVPlMAi"
    }
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly and updates props (receive and crypto)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={order} />).dive();
    expect(wrapShallow).toMatchSnapshot();
    wrapShallow.setProps({ order });
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (deposit and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('renders correctly (receive and fiat)', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Receive" order={orderFiat} />).dive();
    expect(wrapShallow).toMatchSnapshot();
  });

  it('copy trigger is called', () => {
    const wrapShallow = shallow(<OrderCoinProcessed type="Deposit" order={order} />);
    const spy = jest.spyOn(wrapShallow.instance(), 'triggerCopyAddressElementTooltip');

    expect(spy).not.toHaveBeenCalled();
    wrapShallow
      .dive()
      .find('[data-test="copy-address"]')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});