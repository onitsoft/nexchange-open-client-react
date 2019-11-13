import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderDepthItem from './OrderDepthItem.js';

describe('OrderDepthItem', () => {

  let wrapShallow;
  const side = 'SELL';
  const item = { size: 573.000000000, rate: 0.000017510 };

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares); 
  const initialState = {
      orderBook: {
        myOrders: [],
      }
  } 
  const store = mockStore(initialState);
  beforeEach(() => {
    wrapShallow = shallow(<OrderDepthItem 
                            store={store}
                            item={item} 
                            side={side} />).dive();});

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});
