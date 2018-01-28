import Config from "react-native-config/index";

const initialState = {
  difficulty: parseInt(Config.DEFAULT_DIFFICULTY, 10),
};

const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DIFFICULTY_CHANGED':
      return {...state, difficulty: action.payload.difficulty};
    default:
      return state;
  }
};

export default ColorReducer;