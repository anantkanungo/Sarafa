import {RNToasty} from 'react-native-toasty';
import http from '../../services/Api';
import {
  CATEGORY_LIST,
  DISCOUNT_LIST,
  LOADING,
  PRIVACY_POLICY,
  SERVICE_LIST,
} from '../Types';

export const GetAllCategory = () => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  http
    .get(`category_data`)
    .then(async response => {
      if (response.data?.[0]) {
        dispatch({
          type: CATEGORY_LIST,
          payload: response.data,
        });
        // RNToasty.Success({
        //     title: "get all category successfully",
        //     duration: 2,
        // });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        // RNToasty.Info({
        //     title: response.data.message,
        //     duration: 2,
        // });
      }
    })
    .catch(error => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      // console.log("user data error : ", error.response.data)
      // RNToasty.Error({
      //     title: error.response.data.message,
      //     duration: 2,
      // });
    });
};

export const GetAllService = () => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  http
    .get(`service_data`)
    .then(async response => {
      if (response.data.response) {
        dispatch({
          type: SERVICE_LIST,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //     title: "get all service successfully",
        //     duration: 2,
        // });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        // RNToasty.Info({
        //     title: response.data.message,
        //     duration: 2,
        // });
      }
    })
    .catch(error => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      // console.log("user data error : ", error.response.data)
      // RNToasty.Error({
      //     title: error.response.data.message,
      //     duration: 2,
      // });
    });
};

export const GetPrivacyPolicy = () => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  http
    .get(`privacy_policy`)
    .then(async response => {
      if (response.data?.response) {
        dispatch({
          type: PRIVACY_POLICY,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //     title: .response.data.message,
        //     duration: 2,
        // });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        // RNToasty.Info({
        //     title: response.data.message,
        //     duration: 2,
        // });
      }
    })
    .catch(error => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      // console.log("user data error : ", error.response.data)
      // RNToasty.Error({
      //     title: error.response.data.message,
      //     duration: 2,
      // });
    });
};

export const GetDiscountList = () => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  http
    .get(`discount_list`)
    .then(async response => {
      if (response.data?.response) {
        dispatch({
          type: DISCOUNT_LIST,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //     title: .response.data.message,
        //     duration: 2,
        // });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        // RNToasty.Info({
        //     title: response.data.message,
        //     duration: 2,
        // });
      }
    })
    .catch(error => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      // console.log("user data error : ", error.response.data)
      // RNToasty.Error({
      //     title: error.response.data.message,
      //     duration: 2,
      // });
    });
};
