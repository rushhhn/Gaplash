import {
  EMessageActions,
  IMessage,
  TMessageActions,
} from '../types/messageTypes';

interface IMessagesState {
  messages: IMessage[];
  isLoadingMessages: boolean;
  error: IError | null;
}

interface IError {
  hasError: boolean;
}

const initialState = {
  messages: [],
  isLoadingMessages: false,
  error: null,
};

export const messageReducer = (
  state: IMessagesState = initialState,
  action: TMessageActions,
) => {
  switch (action.type) {
    case EMessageActions.SET_IS_MESSAGES_LOADING:
      return {...state, isLoadingMessages: action.payload};
    case EMessageActions.GET_MESSAGES:
      return {...state, messages: action.payload, isLoadingMessages: false};
    default:
      return state;
  }
};
