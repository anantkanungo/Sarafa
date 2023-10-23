import {
  AUTH_TOKEN,
  CATEGORY_LIST,
  CURRENT_LAT_LONG,
  DISCOUNT_LIST,
  LOADING,
  ORIENTATION,
  PRIVACY_POLICY,
  RESET_NAV,
  SERVICE_LIST,
  USER_DATA,
  USER_ID,
} from '../Types';

const initialState = {
  serviceList: null,
  categoryList: null,
  loading: false,
  privacyPolicy: null,
  discountList: null,
  currentLatLong: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case SERVICE_LIST:
      return {
        ...state,
        serviceList: action.payload,
      };
    case DISCOUNT_LIST:
      return {
        ...state,
        discountList: action.payload,
      };
    case PRIVACY_POLICY:
      return {
        ...state,
        privacyPolicy: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CURRENT_LAT_LONG:
      return {
        ...state,
        currentLatLong: action.payload,
      };
    default:
      return state;
  }
};
