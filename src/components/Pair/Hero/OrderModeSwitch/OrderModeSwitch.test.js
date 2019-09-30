import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderModeSwitch from './OrderModeSwitch.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('OrderModeSwitch', () => {
  const initialState = {
   orderMode: 'INSTANT'
  };
  let store, wrapShallow;
  const onClick = jest.fn();
  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallow = shallow(<OrderModeSwitch store={store} changeOrderMode={onClick}/>).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
  
  it('contains two actions', () => {
    expect(wrapShallow.find('a').length).toBe(2);
  });

  it('change mode', () => {
    wrapShallow.find('[data-test="ORDER_BOOK"]').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
