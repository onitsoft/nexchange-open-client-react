import React from 'react';
import { shallow } from 'enzyme';
import ErrorAlert from './ErrorAlert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Error Alert', () => {
  let store, wrapShallow;
  const initialState = {
      error: {
          show: true
      }
  };
  beforeEach(() => {
    store = mockStore(initialState);
    wrapShallow = shallow(<ErrorAlert store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });
});
