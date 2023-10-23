import {combineReducers} from 'redux';
import auth from './auth';
import home from './home';

export default combineReducers({
  auth,
  home,
});
