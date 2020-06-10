import { createSelector } from 'reselect';

const selectCart = state => state.cartItemsReducer;
const cartAnimate = state => state.cartItemsReducer;

export const selectCartItems = createSelector(
  [selectCart],
  cartItemsReducer => cartItemsReducer.cartItems
);

export const cartHidden = createSelector(
  cartAnimate,
  cartReducer => cartReducer.hidden
);
export const sidebarHidden = createSelector(
  cartAnimate,
  cartReducer => cartReducer.hiddenSidebar
);