const DifficultyChanged = (difficulty) => {
  return {
    type: 'DIFFICULTY_CHANGED',
    payload: difficulty
  };
};

export default DifficultyChanged;