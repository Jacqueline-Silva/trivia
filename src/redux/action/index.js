import fetchToken from '../../services/fetchToken';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const QUESTIONS = 'QUESTIONS';

export const login = (name, email) => ({ type: LOGIN, name, email });
export const getToken = (token) => ({ type: TOKEN, token });
export const saveQuestions = (questions) => ({ type: QUESTIONS, questions });

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
// push
