import React, { Component } from 'react';


import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import commonStyles from '../styles/Common';
import CorrectAnswer from '../components/CorrectAnswer';
import WrongAnswer from '../components/WrongAnswer';

class EndScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerLeft: <Icon
      name="arrow-left"
      onPress={() => { navigation.goBack(); }}
    />,
  });

  render() {
    return (
      <View style={commonStyles.container}>
        <FlatList
          data={this.props.questions}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            const answer = this.props.answers[item.key];
            if (answer === item.correct_answer) {
              return (
                <CorrectAnswer answer={answer} text={item.question} />
              );
            }
            return (
              <WrongAnswer answer={answer} text={item.question} />
            );
          }
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questionsReducer.questions,
  answers: state.questionsReducer.answers,
});

export default connect(mapStateToProps, {})(EndScreen);
