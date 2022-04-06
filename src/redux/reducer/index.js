import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';

const reducer = combineReducers({
  player,
  token,
  questions,
});

export default reducer;
