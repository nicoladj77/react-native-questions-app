import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import commonStyles from '../styles/Common';
import Entities from 'entities';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import {connect} from "react-redux";

class EndScreen extends Component {

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

  render() {
    return (
      <View style={commonStyles.container}>
        <View style={styles.question}>
          <Text style={styles.text}>End Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    questions: state.questionsReducer.questions,
  };
};

export default connect(mapStateToProps, {})(EndScreen);
