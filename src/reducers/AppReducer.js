import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import DifficultyReducer from './DifficultyReducer';
import ActivityReducer from './ActivityIndicatorReducer';
import QuestionsReducers from './QuestionsReducer';

const AppReducer = combineReducers({
  nav: NavReducer,
  difficultyReducer: DifficultyReducer,
  activityReducer: ActivityReducer,
  questionsReducer: QuestionsReducers,
});

export default AppReducer;