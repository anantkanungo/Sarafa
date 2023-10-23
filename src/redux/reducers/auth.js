import {
  AUTH_TOKEN,
  LOADING,
  ORIENTATION,
  RESET_NAV,
  USER_DATA,
  USER_ID,
} from '../Types';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  userData: null,
  resetNav: null,
  orientation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    case RESET_NAV:
      return {
        ...state,
        resetNav: action.payload,
      };
    case ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
