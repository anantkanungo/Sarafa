import {
  authToken,
  customerLoginRequest,
  customerLoginSuccess,
  customerLoginError,
} from './Type';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthFunction = () => dispatch => {
  dispatch({
    type: authToken,
    payload: 's',
  });
};

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
      .post('http://139.59.58.151:8000/userlogin', params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then(async response => {
        // console.log(response.data)
        const details = response.data;
        const token = response.data.token;
        dispatch(customerLogin_Success(details));
        dispatch({ type: authToken, payload: token });
        // Storing token to AsyncStorage
        // await AsyncStorage.setItem('@AuthToken', response.data.token);
        // alert("success");
        // this.props.navigation.navigate('Home');
        try {
          await AsyncStorage.setItem('@AuthToken', token);
        } catch (error) {
          console.error('AsyncStorage error:', error);
        }
      })
      .catch(err => {
        Alert.alert('Login Failed', 'Some error occurred, please retry');
        console.log(err);
        dispatch(customerLogin_Error(err));
      });
  };
};

// http://139.59.58.151:8000/adminlogin
// JSON Content
// {
//   "userId" : "ngjewel", "password" : "ng_info"
// }

// http://139.59.58.151:8000/userlogin
// JSON Content
// {
//   "userId" : "user666", "password" : "user666"
// }
