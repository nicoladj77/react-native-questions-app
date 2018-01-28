import React, { Component } from 'react';

import Answer from './Answer';


class WrongAnswer extends Component {

  render() {
    return (
      <Answer text={this.props.text} answer={this.props.answer} backgroundColor="red" />
    );
  }
}

export default WrongAnswer;
