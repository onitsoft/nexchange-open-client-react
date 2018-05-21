import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default ({ story }) => {
  return <ReduxProvider store={createStoreWithMiddleware(reducers)}>{story}</ReduxProvider>;
};
