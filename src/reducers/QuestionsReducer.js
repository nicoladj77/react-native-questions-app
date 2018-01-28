const initialState = {
  questions: [],
  activeQuestionIndex: false,
  answers: []
};

const QuestionsReducers = (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {...state, questions: action.payload.questions};
    case 'SET_ANSWER':
      const answers = state.answers;
      answers[state.activeQuestionIndex] = action.payload.answer;
      return {...state, answers};
    case 'SET_ACTIVE_QUESTION_INDEX':
      return {...state, activeQuestionIndex: action.payload.activeQuestionIndex};
    default:
      return state;
  }
};

export default QuestionsReducers;