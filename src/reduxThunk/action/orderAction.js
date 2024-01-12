import {add_to_cart, remove_from_cart} from '../Type';

export const addToCart = userSelected => {
  return {
    type: add_to_cart,
    payload: userSelected,
  };
};

export const removeFromCart = userSelected => {
  return {
    type: remove_from_cart,
    payload: userSelected,
  };
};

export const removeAllItemsFromCart = () => ({
  type: 'REMOVE_ALL_ITEMS_FROM_CART',
});
