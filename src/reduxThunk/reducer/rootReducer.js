import {combineReducers} from 'redux';
import {reducerLogin} from './authReducer';
import {orderReducer} from './orderReducer';

export default combineReducers({
  login: reducerLogin,
  cart: orderReducer,
});
