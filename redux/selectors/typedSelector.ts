import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {TRootReducer} from '../reducers/rootReducer';

export const useTypedSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
