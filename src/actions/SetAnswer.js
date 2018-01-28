const SetAnswer= (answer) => {
  return {
    type: 'SET_ANSWER',
    payload: { answer }
  };
};

export default SetAnswer;