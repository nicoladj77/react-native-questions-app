import React from 'react';
import Entities from 'entities';

import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 15,
  },
  answer: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
});

class Answer extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  render() {
    const viewStyle = {
      backgroundColor: this.props.backgroundColor,
      marginBottom: 3,
    };
    const questionText = Entities.decodeHTML(this.props.text);
    return (
      <View style={viewStyle}>
        <Text style={styles.text}>{questionText}</Text>
        <Text style={styles.answer}>{`Your answer was ${this.props.answer}`}</Text>
      </View>
    );
  }
}

export default Answer;
