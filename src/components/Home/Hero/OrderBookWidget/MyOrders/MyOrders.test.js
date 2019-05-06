import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyOrders from './MyOrders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MyOrders', () => {
  const initialState = {
      orderBook: {
          myOrders: []
      }
  };
  let store, wrapShallow;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallow = shallow(<MyOrders store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});

