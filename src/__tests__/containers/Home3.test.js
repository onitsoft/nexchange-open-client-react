import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { setupIntegrationTest } from './utils';

// import myReducer from '../src/reducers';
import Home from '../../containers/Home';

describe('integration tests', () => {
  let store;
  let dispatchSpy;
  let router;

  beforeEach(() => {
    router = {
      params: { order: '123123' },
    };
    ({ store, dispatchSpy } = setupIntegrationTest({ myReducer }, router));
  });

  it('should change the text on click', () => {
    const sut = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    
    sut.find('div').simulate('click');
    
    expect(sut.find('div').prop('children')).toEqual('new text');
  });
});