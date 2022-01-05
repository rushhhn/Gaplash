import {authReducer} from './authReducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({authReducer});

export type TRootReducer = ReturnType<typeof rootReducer>;
