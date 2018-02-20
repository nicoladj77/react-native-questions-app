import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const WrongAnswer = props => (
  <Answer text={props.text} answer={props.answer} backgroundColor="red" />
);

WrongAnswer.propTypes = {
  text: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default WrongAnswer;
