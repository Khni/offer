import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CHECKOUT_LINK_ADD,
  CHECKOUT_LINK_REMOVE
  , FETCH_CART
  , ERROR_FETCH_CART
  , CART_IS_LOADING
  , CART_UPDATE
} from '../types';
import axios from 'axios'
import * as APIs from './APIs'
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from './cart.utils';


export const chechoutRedirect = () => {
  return dispatch => {
    console.log("dispatch link");
    dispatch({
      type: CHECKOUT_LINK_ADD,

    });

  }

}

export const chechoutRedirectDone = () => ({
  type: CHECKOUT_LINK_REMOVE
});


export const addItem = (item, items) => ({
  type: ADD_ITEM_TO_CART,
  item: item,
  items: addItemToCart(items, item)
});



export const addItemToCartItem = (item, items, token, isAuthenticated) => {
  console.log("token: " +token);
  if (token && isAuthenticated) {
    console.log("user auth");
    return async dispatch => {
      let response = ''
      let filteredCart = []
      let totalPrice = 0

      dispatch({
        type: CART_UPDATE
      });



      try {
        response = await axios.post(APIs.CART_POST_ADD, { productID: item._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("res" +response );

        filteredCart = response.data.cartProducts.filter(p => p.quantity !== 0)
        totalPrice = filteredCart.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)


        console.log("res" + response);
        dispatch({
          type: FETCH_CART,
          cart: response.data.cartProducts,
          filteredCart: filteredCart,
          totalPrice: totalPrice,

        });


      } catch (e) {
       console.log("err" +JSON.stringify( e.response.data)  );


      }

    }

  }
  //get token and isAuthenticated to check if user logged 
  //if logged return axios to add to server cart
  //else add to localCart
  const updatedItems = addItemToCart(items, item)
  return dispatch => {
    dispatch({
      type: CART_UPDATE
    });

    dispatch({
      type: ADD_ITEM_TO_CART,
      items: updatedItems

    });


  };
}



export const removeItemFromCartItem = (item, items, token, isAuthenticated) => {


  if (token && isAuthenticated) {
    return async dispatch => {
      let response = ''
      let filteredCart = []
      let totalPrice = 0

      dispatch({
        type: CART_UPDATE
      });



      try {
        response = await axios.post(APIs.CART_POST_DECREASE, { productID: item._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        filteredCart = response.data.cartProducts.filter(p => p.quantity !== 0)
        totalPrice = filteredCart.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)


        console.log("res" + response);
        dispatch({
          type: FETCH_CART,
          cart: response.data.cartProducts,
          filteredCart: filteredCart,
          totalPrice: totalPrice,

        });


      } catch (e) {


      }

    }

  }




  const updatedItems = removeItemFromCart(items, item)
  return dispatch => {

    dispatch({
      type: CART_UPDATE
    });

    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      items: updatedItems

    });


  };
}





export const deleteItemFromCartItem = (item, items, token, isAuthenticated) => {




  if (token && isAuthenticated) {
    return async dispatch => {
      let response = ''
      let filteredCart = []
      let totalPrice = 0

      dispatch({
        type: CART_UPDATE
      });



      try {
        response = await axios.post(APIs.CART_POST_REMOVE, { productID: item._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        filteredCart = response.data.cartWithProducts.filter(p => p.quantity !== 0)
        totalPrice = filteredCart.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)


        console.log("res" + response);
        dispatch({
          type: FETCH_CART,
          cart: response.data.cartProducts,
          filteredCart: filteredCart,
          totalPrice: totalPrice,

        });


      } catch (e) {


      }

    }

  }





  const updatedItems = deleteItemFromCart(items, item)
  return async dispatch => {

    dispatch({
      type: CART_UPDATE
    });

    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      items: updatedItems

    });


  };
}


export const removeItem = (item, items) => ({
  type: REMOVE_ITEM_FROM_CART,
  item: item
});





//cartProducts


export const fetchCart = (cartItems, token, isAuthenticated) => {

  return async dispatch => {
    dispatch({
      type: CART_IS_LOADING
    });

    try {
      console.log("token::" +token);

      let response = ''
      let filteredCart = []
      let totalPrice = 0
      if (isAuthenticated && token) {
        console.log("user ok");
        //if user is Authenticated fetch cart from server
        response = await axios.get(APIs.CART_GET_SERVER, {
          headers: { Authorization: `Bearer ${token}` }
        });
        filteredCart = response.data.cartWithProducts.filter(p => p.quantity !== 0)
        totalPrice = filteredCart.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)



      } else {
        console.log("not user");
        //if user is not Authenticated return local cart from server
        response = await axios.post(APIs.CART_GET_LOCAL, { cart: cartItems });
        console.log("cart" + response.data.cartWithProducts);
        filteredCart = response.data.cartWithProducts.filter(p => p.quantity !== 0)
        totalPrice = filteredCart.reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)

      }
      console.log("res" + response);
      dispatch({
        type: FETCH_CART,
        cart: response.data.cartWithProducts,
        filteredCart: filteredCart,
        totalPrice: totalPrice,

      });

    } catch (err) {
      console.log("err" + err);
      dispatch({
        type: ERROR_FETCH_CART,
        payload: err
      })
    }
  };
}


