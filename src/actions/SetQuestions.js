const SetQuestions = (questions) => {
  return {
    type: 'SET_QUESTIONS',
    payload: {questions}
  };
};

export default SetQuestions;