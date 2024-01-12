import {add_to_cart, remove_from_cart} from '../Type';
const initialState = [];

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_to_cart:
      return [...state, action.payload];
    case remove_from_cart:
      let newOrder = state.filter(userSelected => {
        return userSelected._id !== action.payload;
      });
      return [...newOrder];
    case 'REMOVE_ALL_ITEMS_FROM_CART':
      return [];
    default:
      return state;
  }
};
