import {ISetIsLoading} from './authTypes';

export interface IMessage {
  chatroomId: string;
  authorId: string;
  date: string;
  body: string;
}

export enum EMessageActions {
  GET_MESSAGES = 'GET_MESSAGES',
  SET_IS_MESSAGES_LOADING = 'SET_IS_MESSAGES_LOADING',
}

export interface ISetLoading {
  type: EMessageActions.SET_IS_MESSAGES_LOADING;
  payload: boolean;
}

export interface IGetMessages {
  type: EMessageActions.GET_MESSAGES;
  payload: IMessage[];
}

export type TMessageActions = IGetMessages | ISetLoading;
