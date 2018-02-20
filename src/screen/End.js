import React from 'react';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import commonStyles from '../styles/Common';
import CorrectAnswer from '../components/CorrectAnswer';
import WrongAnswer from '../components/WrongAnswer';

class EndScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerLeft: null,
  });

  constructor() {
    super();
    this.navigateToHome = this.navigateToHome.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  navigateToHome() {
    this.resetNavigation('Main');
  }

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
        <View>
          <Button title="Start Again" onPress={this.navigateToHome} />
        </View>
      </View>
    );
  }
}

EndScreen.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questionsReducer.questions,
  answers: state.questionsReducer.answers,
});

export default connect(mapStateToProps, {})(EndScreen);
