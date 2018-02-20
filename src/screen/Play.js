import React from 'react';
import { Button } from 'react-native-elements';
import Entities from 'entities';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import SetActiveQuestion from '../actions/SetActiveQuestion';
import SetAnswer from '../actions/SetAnswer';
import commonStyles from '../styles/Common';

const styles = StyleSheet.create({
  counter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    alignSelf: 'stretch',
  },
  question: {
    flex: 2,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  text: {
    textAlign: 'center',
  },
  actions: {
    flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  buttons: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

class PlayScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeQuestionIndex: PropTypes.number.isRequired,
    SetAnswer: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    SetActiveQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor() {
    super();
    this.pressFalse = this.pressFalse.bind(this);
    this.pressTrue = this.pressTrue.bind(this);
  }

  pressTrue() {
    this.props.SetAnswer('True');
    this.updateQuestionOrNavigateToFinishPage();
  }

  pressFalse() {
    this.props.SetAnswer('False');
    this.updateQuestionOrNavigateToFinishPage();
  }

  answeredLastQuestion() {
    if ((this.props.activeQuestionIndex + 1) === this.props.questions.length) {
      return true;
    }
    return false;
  }

  updateQuestionOrNavigateToFinishPage() {
    if (this.answeredLastQuestion() === true) {
      let correctAnswers = 0;
      this.props.questions.forEach((question, index) => {
        const givenAnswer = this.props.answers[index];
        if (givenAnswer === question.correct_answer) {
          correctAnswers += 1;
        }
      });
      const { navigate } = this.props.navigation;
      navigate('End', { title: `${correctAnswers} correct answers!` });
    } else {
      this.props.navigation.setParams({
        title: this.props.questions[this.props.activeQuestionIndex + 1].category,
      });
      this.props.SetActiveQuestion(this.props.activeQuestionIndex + 1);
    }
  }

  render() {
    if (this.props.questions.length) {
      const question = this.props.questions[this.props.activeQuestionIndex];
      const questionText = Entities.decodeHTML(question.question);
      const totalQuestions = this.props.questions.length;
      const currentQuestionIndex = this.props.activeQuestionIndex + 1;

      return (
        <View style={commonStyles.container}>
          <View style={styles.question}>
            <Text style={styles.text}>{questionText}</Text>
          </View>
          <View style={styles.counter}>
            <Text style={styles.text}>{`Question ${currentQuestionIndex} of ${totalQuestions}`}</Text>
          </View>
          <View style={styles.actions}>
            <Button buttonStyle={styles.buttons} title="True" onPress={this.pressTrue} />
            <Button buttonStyle={styles.buttons} title="False" onPress={this.pressFalse} />
          </View>
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  questions: state.questionsReducer.questions,
  activeQuestionIndex: state.questionsReducer.activeQuestionIndex,
  answers: state.questionsReducer.answers,
});

export default connect(mapStateToProps, {
  SetActiveQuestion,
  SetAnswer,
})(PlayScreen);
