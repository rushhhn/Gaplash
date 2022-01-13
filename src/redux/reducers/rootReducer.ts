import {authReducer} from './authReducer';
import {chatsReducer} from './chatsReducer';
import {messageReducer} from './messageReducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  authReducer,
  chatsReducer,
  messageReducer,
});

export type TRootReducer = ReturnType<typeof rootReducer>;
