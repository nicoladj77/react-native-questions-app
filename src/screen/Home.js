import React from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

import commonStyles from '../styles/Common';
import DifficultyChanged from '../actions/DifficultyChanged';
import StartLoading from '../actions/StartLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  body: {
    flex: 3,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});

class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Welcome to the Trivia App!',
  };

  static propTypes = {
    difficulty: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    DifficultyChanged: PropTypes.func.isRequired,
    StartLoading: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.updateDifficulty = this.updateDifficulty.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
  }

  getDifficulty() {
    switch (this.props.difficulty) {
      case 0:
        return 'easy';
      case 1:
        return 'medium';
      case 2:
        return 'hard';
      default:
        return 'medium';
    }
  }

  updateDifficulty(difficulty) {
    this.props.DifficultyChanged({ difficulty });
  }

  beginPlay() {
    this.props.StartLoading(this.getDifficulty());
  }

  render() {
    const buttons = ['Easy', 'Medium', 'Hard'];
    const { difficulty } = this.props;

    return (
      <View style={commonStyles.container}>
        <View style={styles.body}>
          <Text style={styles.text}>Choose the difficulty level</Text>
          <ButtonGroup
            onPress={this.updateDifficulty}
            selectedIndex={difficulty}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Begin play"
            onPress={this.beginPlay}
          />
        </View>
        {this.props.loading &&
        <View style={commonStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  difficulty: state.difficultyReducer.difficulty,
  loading: state.activityReducer.loading,
});

export default connect(mapStateToProps, {
  DifficultyChanged,
  StartLoading,
})(HomeScreen);
