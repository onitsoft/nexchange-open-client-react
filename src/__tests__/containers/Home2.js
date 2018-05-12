import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Home } from '../../containers/Home';

import currency from '../__mocks__/currency';
import orders from '../__mocks__/orders';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const storeStateMock = {
  coinsInfo: currency,
  wallet: { address: '', valid: false, show: false },
  error: { show: false, message: null },
};

// 

describe('<Home />', () => {
  it('calls componentDidMount', () => {
    const store = mockStore(storeStateMock);
    mock.onGet('https://api.nexchange.io/en/api/v1/orders/?page=1').reply(200, orders);
    sinon.spy(Home.prototype, 'componentDidMount');
    const wrapper = mount(<Provider store={store}><Home /></Provider>);
    expect(Home.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  // it('allows us to set props', () => {
  //   const wrapper = mount(<Home bar="baz" />);
  //   expect(wrapper.props().bar).to.equal('baz');
  //   wrapper.setProps({ bar: 'foo' });
  //   expect(wrapper.props().bar).to.equal('foo');
  // });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = mount((
  //     <Home onButtonClick={onButtonClick} />
  //   ));
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });
});