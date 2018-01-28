import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import WithQuery from 'with-query';

import commonStyles from '../styles/Common';
import DifficultyChanged from '../actions/DifficultyChanged';
import FinishLoading from '../actions/FinishLoading';
import StartLoading from '../actions/StartLoading';
import SetActiveQuestion from '../actions/SetActiveQuestion';
import SetQuestions from '../actions/SetQuestions';

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

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to the Trivia App!',
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
    const { navigate } = this.props.navigation;
    const url = WithQuery(Config.API_URL, {
      type: 'boolean',
      amount: 10,
      difficulty: this.getDifficulty(),
    });

    this.props.StartLoading();

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        const questions = res.results;

        if (!questions.length) {
          throw new Error('No data returned from API');
        }
        questions.forEach((question, index) => {
          questions[index].key = index;
        });
        this.props.FinishLoading();
        this.props.SetQuestions(questions);
        this.props.SetActiveQuestion(0);
        navigate('Play', { title: questions[0].category });
      })
      .catch((res) => {
        this.props.FinishLoading();
        Alert.alert(
          'Error',
          res.message,
          [
            { text: 'OK' },
          ],
          { cancelable: true },
        );
      });
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
  FinishLoading,
  StartLoading,
  SetQuestions,
  SetActiveQuestion,
})(HomeScreen);
