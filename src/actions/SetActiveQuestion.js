const SetActiveQuestion = (activeQuestionIndex) => {
  return {
    type: 'SET_ACTIVE_QUESTION_INDEX',
    payload: {activeQuestionIndex}
  };
};

export default SetActiveQuestion;