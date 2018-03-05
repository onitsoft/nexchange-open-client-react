import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'

import { CoinSelector } from '../containers/CoinSelector';


configure({ adapter: new Adapter() });

describe('Coin input states',()=>{
  const initialState = {
    selectedCoin: 'deposit'
  };
  const mockStore = configureStore();
  let store, wrapper, coinSelector;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<CoinSelector store={store} type='deposit' /> );
        coinSelector = wrapper;
    });

    // it('+++ render the connected(SMART) component', () => {
    //     expect(container.length).toEqual(1)
    // });

    it('asd', () => {
        console.log(coinSelector.html());
        //console.log(coinSelector.html());
    });
});