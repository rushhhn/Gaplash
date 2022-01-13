import {
  EAuthActions,
  IAuthState,
  TActionTypes,
  IUser,
} from '../types/authTypes';

const initialState: IAuthState = {
  authPage: 'SIGN_IN',
  isSignedIn: false,
  login: '',
  password: '',
  isLoading: false,
  error: '',
  user: {},
};

export const authReducer = (state = initialState, action: TActionTypes) => {
  switch (action.type) {
    case EAuthActions.SET_LOGIN:
      return {...state, login: action.payload};
    case EAuthActions.SET_PASSWORD:
      return {...state, password: action.payload};
    case EAuthActions.SET_AUTH_PAGE:
      return {...state, authPage: action.payload};
    case EAuthActions.SET_USER:
      return {...state, user: action.payload};
    case EAuthActions.SET_IS_LOADING:
      return {...state, isLoading: action.payload};
    case EAuthActions.SIGN_IN:
      return {
        ...state,
        login: action.payload.login,
        password: action.payload.password,
        user: action.payload.user,
        isSignedIn: true,
        isLoading: false,
      };
    case EAuthActions.SIGN_OUT:
      return {...state, isSignedIn: false, isLoading: false};
    case EAuthActions.SHOW_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};
