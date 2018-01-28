import React from 'react';

import Answer from './Answer';

const CorrectAnswer = props => (
  <Answer text={props.text} answer={props.answer} backgroundColor="green" />
);

export default CorrectAnswer;

