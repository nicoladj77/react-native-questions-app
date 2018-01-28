import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';


import HomeScreen from '../screen/Home';
import PlayScreen from '../screen/Play';
import EndScreen from '../screen/End';

export const AppNavigator = StackNavigator({
  Main: { screen: HomeScreen },
  Play: { screen: PlayScreen },
  End: { screen: EndScreen },
}, {
  initialRouteName: 'Main',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
