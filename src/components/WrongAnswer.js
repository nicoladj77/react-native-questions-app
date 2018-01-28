import React from 'react';

import Answer from './Answer';

const WrongAnswer = props => (
  <Answer text={props.text} answer={props.answer} backgroundColor="red" />
);

export default WrongAnswer;
