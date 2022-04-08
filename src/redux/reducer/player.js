import { LOGIN, NEW_SCORE, CLEAR_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case NEW_SCORE:
    return {
      ...state,
      score: state.score + action.score.score,
      assertions: state.assertions + action.score.assertions,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
