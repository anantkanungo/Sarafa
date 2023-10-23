import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getUniqueId} from 'react-native-device-info';

// export const baseURL = 'https://laundry.theprojecttest.xyz/api/'
// export const http2 = 'https://laundry.theprojecttest.xyz/'

export const baseURL = 'https://dryfi.theprojecttest.xyz/api/';
export const http2 = 'https://dryfi.theprojecttest.xyz/';

export const http1 = axios.create({
  baseURL: 'https://dryfi.theprojecttest.xyz/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // ApiToken: 'U0RvR2x0SEZYa0ljSzgxUkFCUHZpRUpvREFlb0FuTFBPSFA=',
  },
});

const http = axios.create({
  baseURL: 'https://dryfi.theprojecttest.xyz/api/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // ApiToken: 'U0RvR2x0SEZYa0ljSzgxUkFCUHZpRUpvREFlb0FuTFBPSFA=',
  },
});
// export const http2 = 'https://medzine.svisf.in/'

http.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@USER_TOKEN');
    // const signup_token = await AsyncStorage.getItem('@SIGNUP_TOKEN');
    // if(signup_token) config.headers.Authorization = `Bearer ${signup_token}`;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default http;
