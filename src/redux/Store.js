import {applyMiddleware, createStore} from 'redux';
// https://github.com/reduxjs/redux-thunk
import thunk from 'redux-thunk';

import RootReducers from './reducers';

export const store = createStore(RootReducers, applyMiddleware(thunk));
