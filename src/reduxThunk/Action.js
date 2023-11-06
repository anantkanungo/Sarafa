import {
  customerLoginRequest,
  customerLoginSuccess,
  customerLoginError,
} from './Type';
import axios from 'axios';

const customerLogin_Request = () => {
  return {
    type: customerLoginRequest,
  };
};
const customerLogin_Success = details => {
  return {
    type: customerLoginSuccess,
    payload: details,
  };
};
const customerLogin_Error = err => {
  return {
    type: customerLoginError,
    payload: err,
  };
};

export const customerLogin = (userId, password) => {
  return function (dispatch) {
    dispatch(customerLogin_Request());

    let params = {
      userId: userId,
      password: password,
    };

    axios
      .post('http://192.168.43.208:8000/adminlogin', params)
      .then(response => {
        // console.log(response.data)
        var details = response.data;
        dispatch(customerLogin_Success(details));
      })
      .catch(err => {
        console.log(err);
        dispatch(customerLogin_Error(err));
      });
  };
};
