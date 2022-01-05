import {Dispatch} from 'redux';
import {EAuthActions, TActionTypes} from '../types/authTypes';
import auth from '@react-native-firebase/auth';

export const setLogin = (text: string) => {
  return (dispatch: Dispatch<TActionTypes>) => {
    try {
      dispatch({type: EAuthActions.SET_LOGIN, payload: text});
    } catch (e) {
      console.log('Failed to set a new login. ', e);
    }
  };
};

export const setPassword = (text: string) => {
  return (dispatch: Dispatch<TActionTypes>) => {
    try {
      dispatch({type: EAuthActions.SET_PASSWORD, payload: text});
    } catch (e) {
      console.log('Failed to set a new password. ', e);
    }
  };
};

export const setAuthPage = (page: string) => {
  return (dispatch: Dispatch<TActionTypes>) => {
    dispatch({type: EAuthActions.SET_AUTH_PAGE, payload: page});
  };
};

export const signIn = (login: string, password: string) => {
  try {
    return (dispatch: Dispatch<TActionTypes>) => {
      auth()
        .signInWithEmailAndPassword(login, password)
        .then(() => {
          dispatch({
            type: EAuthActions.SIGN_IN,
            payload: {login, password},
          }),
            dispatch({type: EAuthActions.SET_IS_LOADING, payload: false});
          dispatch({type: EAuthActions.SHOW_ERROR, payload: ''});
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    };
  } catch (e) {
    console.log(console.log('Failed to sign in the user. ', e));
  }
};

export const signOut = () => {
  try {
    return (dispatch: Dispatch<TActionTypes>) => {
      auth().signOut();
      dispatch({type: EAuthActions.SIGN_OUT});
    };
  } catch (e) {
    console.log('Failed to sign out. ', e);
  }
};

export const signUp = (login: string, password: string) => {
  try {
    return (dispatch: Dispatch<TActionTypes>) => {
      auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => {
          dispatch({
            type: EAuthActions.SIGN_UP,
            payload: {login, password},
          }),
            dispatch({type: EAuthActions.SET_IS_LOADING, payload: false}),
            dispatch({type: EAuthActions.SHOW_ERROR, payload: ''});
        })
        .catch(error => {
          dispatch({type: EAuthActions.SHOW_ERROR, payload: error.code});
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    };
  } catch (e) {
    console.log(console.log('Failed to sign in the user. ', e));
  }
};
