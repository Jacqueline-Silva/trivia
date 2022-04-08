import fetchToken from '../../services/fetchToken';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';
export const NEW_SCORE = 'NEW_SCORE';
export const CLEAR_SCORE = 'CLEAR_SCORE';

export const login = (name, email) => ({ type: LOGIN, name, email });
export const getToken = (token) => ({ type: TOKEN, token });
export const saveQuestions = (questions) => ({ type: QUESTIONS, questions });
export const newScore = (score) => ({ type: NEW_SCORE, score });
export const clearScore = () => ({ type: CLEAR_SCORE });

export function fetchTokenThunk() {
  return async (dispatch) => {
    try {
      const token = await fetchToken();
      dispatch(getToken(token));
    } catch (error) {
      console.log(error);
    }
  };
}
