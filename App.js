import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState from './src/components/AppNavigator';

import { middleware } from './src/utils/redux';

const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
);

const QuestionsApp = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default QuestionsApp;

