import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const CorrectAnswer = props => (
  <Answer text={props.text} answer={props.answer} backgroundColor="green" />
);

CorrectAnswer.propTypes = {
  text: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default CorrectAnswer;

