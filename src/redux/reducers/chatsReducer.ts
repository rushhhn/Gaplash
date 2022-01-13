import {EChatActions, IChat, TChatActions} from '../types/chatTypes';

interface IChatsState {
  isLoading: boolean;
  chatrooms: IChat[];
  error: {} | null;
}

const initialState = {
  isLoading: false,
  chatrooms: [],
  error: null,
};

export const chatsReducer = (
  state: IChatsState = initialState,
  action: TChatActions,
) => {
  switch (action.type) {
    case EChatActions.SET_CHATROOMS:
      return {...state, chatrooms: action.payload};
    default:
      return state;
  }
};
