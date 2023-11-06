import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducerLogin} from './Reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

var reducer = combineReducers({
  login: reducerLogin,
});

var gstore = createStore(reducer, applyMiddleware(thunk, logger));
export default gstore;
