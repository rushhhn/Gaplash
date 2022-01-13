export interface IAuthState {
  authPage: string;
  isSignedIn: boolean;
  login: string;
  password: string;
  isLoading: boolean;
  error: string;
  user: {};
}

export interface IUser {
  uid: string;
  email: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export enum EAuthActions {
  SET_LOGIN = 'SET_LOGIN',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_AUTH_PAGE = 'SET_AUTH_PAGE',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SIGN_UP = 'SIGN_UP',
  SHOW_ERROR = 'SHOW_ERROR',
  SET_USER = 'SET_USER',
}

export interface ISetLogin {
  type: EAuthActions.SET_LOGIN;
  payload: string;
}

export interface ISetPassword {
  type: EAuthActions.SET_PASSWORD;
  payload: string;
}

export interface ISetAuthPage {
  type: EAuthActions.SET_AUTH_PAGE;
  payload: string;
}

export interface ISetIsLoading {
  type: EAuthActions.SET_IS_LOADING;
  payload: boolean;
}

export interface ISignIn {
  type: EAuthActions.SIGN_IN;
  payload: IUserLogin;
}

export interface ISignOut {
  type: EAuthActions.SIGN_OUT;
}

export interface ISignIUp {
  type: EAuthActions.SIGN_UP;
}

export interface IShowError {
  type: EAuthActions.SHOW_ERROR;
  payload: string;
}

export interface ISetUser {
  type: EAuthActions.SET_USER;
  payload: IUser;
}

export type TActionTypes =
  | ISetLogin
  | ISetPassword
  | ISetAuthPage
  | ISetIsLoading
  | ISignIn
  | ISignOut
  | ISignIUp
  | IShowError
  | ISetUser;
