import {Dispatch} from 'redux';
import {
  EMessageActions,
  IMessage,
  TMessageActions,
} from '../types/messageTypes';

export const getMessages = (messages: IMessage[]) => {
  return async (dispatch: Dispatch<TMessageActions>) => {
    try {
      dispatch({
        type: EMessageActions.GET_MESSAGES,
        payload: messages,
      });
    } catch (e) {
      console.log('Failed to get messages. ', e);
    }
  };
};
