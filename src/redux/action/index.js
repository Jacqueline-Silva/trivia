import fetchToken from '../../services/fetchToken';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const login = (name, email) => ({ type: LOGIN, name, email });
export const getToken = (token) => ({ type: TOKEN, token });

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

//Subindo release