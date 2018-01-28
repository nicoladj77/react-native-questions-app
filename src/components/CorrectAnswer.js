import React, { Component } from 'react';

import Answer from './Answer';


class CorrectAnswer extends Component {

  render() {
    return (
      <Answer text={this.props.text} answer={this.props.answer} backgroundColor="green" />
    );
  }
}

export default CorrectAnswer;

