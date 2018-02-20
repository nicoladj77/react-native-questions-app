import { takeEvery, call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import Api from '../utils/Api';

// FETCH_USERS
function* fetchQuestions(action) {
  try {
    yield put({ type: 'STARTED_LOADING' });
    const questions = yield call(Api.fetchQuestions, action.payload.difficulty);
    yield put({ type: 'FINISHED_LOADING' });
    yield put({ type: 'SET_QUESTIONS', payload: { questions } });
    yield put({ type: 'SET_ACTIVE_QUESTION_INDEX', payload: { activeQuestionIndex: 0 } });
    yield put(NavigationActions.navigate({ routeName: 'Play', params: { title: questions[0].category } }));
  } catch (error) {
    yield put({ type: 'FETCH_QUESTIONS_FAILED', error });
  }
}

export default function* rootSaga() {
  yield takeEvery('FETCH_QUESTIONS', fetchQuestions);
}
