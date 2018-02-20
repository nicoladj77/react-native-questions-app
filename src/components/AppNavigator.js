import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import HomeScreen from '../screen/Home';
import PlayScreen from '../screen/Play';
import EndScreen from '../screen/End';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Main: { screen: HomeScreen },
  Play: { screen: PlayScreen },
  End: { screen: EndScreen },
}, {
  initialRouteName: 'Main',
});


class AppWithNavigationState extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
