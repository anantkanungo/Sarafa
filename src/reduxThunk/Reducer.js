import {
  customerLoginError,
  customerLoginSuccess,
  customerLoginRequest,
} from './Type';

const loginInitialState = {
  loading: false,
  details: {},
  error: '',
};

export const reducerLogin = (state = loginInitialState, action) => {
  switch (action.type) {
    case customerLoginRequest:
      return {
        ...state,
        loading: true,
      };
    case customerLoginSuccess:
      return {
        ...state,
        loading: false,
        details: action.payload,
      };
    case customerLoginError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
