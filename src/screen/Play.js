import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import commonStyles from '../styles/Common';
import Entities from 'entities';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import SetActiveQuestion from "../actions/SetActiveQuestion";
import SetAnswer from '../actions/SetAnswer';
import {connect} from "react-redux";

class PlayScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: `${navigation.state.params.title}`,
    };
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
    if (true === this.answeredLastQuestion()) {
      let correctAnswers = 0;
      this.props.questions.forEach((question, index) => {
        let givenAnswer = this.props.answers[index];
        if (givenAnswer === question.correct_answer) {
          correctAnswers += 1;
        }
      });
      const {navigate} = this.props.navigation;
      navigate('End', { title: `You got ${correctAnswers}!` });
    } else {
      this.props.navigation.setParams({title: this.props.questions[this.props.activeQuestionIndex + 1].category});
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
            <Button buttonStyle={styles.buttons} title={"True"} onPress={this.pressTrue}/>
            <Button buttonStyle={styles.buttons} title={"False"} onPress={this.pressFalse}/>
          </View>
        </View>
      );
    }
    return null;
  }
}

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
  }
});

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer.questions,
    activeQuestionIndex: state.questionsReducer.activeQuestionIndex,
    answers: state.questionsReducer.answers
  };
};

export default connect(mapStateToProps, {
  SetActiveQuestion,
  SetAnswer
})(PlayScreen);
