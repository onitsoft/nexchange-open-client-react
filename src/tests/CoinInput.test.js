import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

import CoinInput from '../containers/CoinInput';


configure({ adapter: new Adapter() });

describe('Coin input states',()=>{
  const initialState = {};
  const mockStore = configureStore();
  let store, wrapper, coinInput;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<CoinInput store={store} type='deposit' /> );
    coinInput = wrapper.dive();
  });

  it('initial coin input should be "..."', () => {
    expect(coinInput.find('input').props().value).toBe('...');
  });

  it('should allow to set values', () => {
    coinInput.find('input').simulate('change', { target: { value: 10 } });
    expect(coinInput.find('input').props().value).toBe(10);
  });

  // it('renders', () => {
  //   const wrapper = mount(<Provider store={store}><CoinSelector /></Provider>);
    
  //   const coinSelector = wrapper.dive({context: {store}}).dive();

  //   // Now you can do stuff like...
  //   coinSelector.instance().selectCoin('ETH')

  // });

});