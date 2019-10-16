import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderDepth from './OrderDepth.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('OrderDepth', () => {
  let wrapShallow;
  const sellDepth = [
    { size: 100.000000000, rate: 0.000019500 },
    { size: 100.000000000, rate: 0.000019400 },
    { size: 573.000000000, rate: 0.000017510 }    
  ];
  const buyDepth = [
      { size: 2400.000000000, rate: 0.000015000 },
      { size: 1175.002932550, rate: 0.000017050 },
      { size: 0.000000400, rate: 55666.000000000 }    
  ]
  const selectedCoin = {receive: 'DOGE', deposit: 'ETH'}
  const initialState = {
    selectedCoin,
    orderBook: {
      sellDepth,
      buyDepth
    }
  };

  beforeEach(() => {
    const store = mockStore(initialState);
    wrapShallow = shallow(<OrderDepth store={store}/>).dive().dive();
                    });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('contains 3 sell depth items and 3 buy depth items', () => {
    expect(wrapShallow.find('[data-test="sell-depth-item"]').length).toBe(3);
    expect(wrapShallow.find('[data-test="buy-depth-item"]').length).toBe(3);
  });

  it('has correct spread value', () => {
    let spreadValue;
    const bestBid = sellDepth[sellDepth.length -1];
    const bestAsk = buyDepth[0];

    spreadValue = (bestAsk.rate - bestBid.rate) / ((bestAsk.rate + bestBid.rate)/2) * 100;
    spreadValue = parseFloat(Math.round(spreadValue * 100) / 100).toFixed(2);

    expect(wrapShallow.find('[data-test="spread"]').text()).toEqual(`Spread ${spreadValue}%`);
  });

});
