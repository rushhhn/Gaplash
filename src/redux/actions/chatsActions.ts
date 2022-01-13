import {Dispatch} from 'react';
import {EChatActions, IChat, TChatActions} from '../types/chatTypes';

export const setChatrooms = (chats: IChat[]) => {
  return (dispatch: Dispatch<TChatActions>) => {
    dispatch({type: EChatActions.SET_CHATROOMS, payload: chats});
  };
};
