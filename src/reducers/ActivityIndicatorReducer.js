const initialState = {
  loading: false,
};

const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STARTED_LOADING':
      return {...state, loading: true};
    case 'FINISHED_LOADING':
      return {...state, loading: false};
    default:
      return state;
  }
};

export default ColorReducer;