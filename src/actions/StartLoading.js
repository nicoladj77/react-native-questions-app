const StartLoading = difficulty => ({
  type: 'FETCH_QUESTIONS',
  payload: { difficulty },
});

export default StartLoading;
