export interface IChat {
  chatroomId: number;
  chatters: string;
  messages: string;
  chatrooms: {};
}

export enum EChatActions {
  SET_CHATROOMS = 'SET_CHATROOMS',
}

export interface ISetChats {
  type: EChatActions.SET_CHATROOMS;
  payload: IChat[];
}

export type TChatActions = ISetChats;
