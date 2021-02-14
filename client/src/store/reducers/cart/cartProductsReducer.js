import {
  FETCH_CART
  , ERROR_FETCH_CART
  , CART_IS_LOADING
  , CART_UPDATE
} from '../../types';
// import { addItemToCart, removeItemFromCart } from './cart.utils';



const INITIAL_STATE = {

  cartProducts: [],
  filteredCart: [], //cart does not contain out of stock product
  totalPrice: 0, //total price of filteredCart
  fetchError: '',
  isLoading: false,
  updateCart: false
};

const cartProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CART_IS_LOADING:

      return {
        ...state,
        isLoading: true
      };


    case CART_UPDATE:
      return {
        ...state,
        updateCart: true
      };



    case FETCH_CART:
      return {
        ...state,
        cartProducts: action.cart,
        filteredCart: action.filteredCart,
        totalPrice: action.totalPrice,
        isLoading: false,
        updateCart: false
      };

    case ERROR_FETCH_CART:
      return {
        ...state,
        fetchError: action.error
      };

    default:
      return state;
  }
};

export default cartProductsReducer;