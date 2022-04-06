import { QUESTIONS } from '../action';

const INITIAL_STATE = {};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS:
    return action.questions;
  default:
    return state;
  }
};

export default questions;
