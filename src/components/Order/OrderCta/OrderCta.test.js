import React from 'react';
import { shallow } from 'enzyme';
import OrderCta from './OrderCta';
import order from 'Mocks/order';
import configureStore from 'redux-mock-store';

describe('OrderCta', () => {
    const mockStore = configureStore();
    let store, wrapShallow;
    order.email = 'test@test.com'
    console.log(order)
    beforeEach(() => {
        store = mockStore(order);
        
        wrapShallow = shallow(<OrderCta store={store} order={order} />)
          .dive()
          .dive();
      });
    
      it('renders correctly', () => {
        expect(wrapShallow).toMatchSnapshot();
      });

    
});
