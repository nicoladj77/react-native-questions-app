import React, { Component } from 'react';

import {
  StackNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './src/reducers/AppReducer';
import AppWithNavigationState from './src/components/AppNavigator';

class QuestionsApp extends React.Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
export default QuestionsApp;

