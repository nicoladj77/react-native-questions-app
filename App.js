import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState from './src/components/AppNavigator';

import { middleware } from './src/utils/redux';
import rootSaga from './src/sagas/Questions';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  AppReducer,
  applyMiddleware(middleware, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const QuestionsApp = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default QuestionsApp;

