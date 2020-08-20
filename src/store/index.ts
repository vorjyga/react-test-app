import {combineReducers, createStore} from 'redux';
import {reducer} from "./modules/candles/reducer";


export const rootReducer = combineReducers({
    request: reducer,
});

export const store = createStore(rootReducer);


export type RootState = ReturnType<typeof rootReducer>;
