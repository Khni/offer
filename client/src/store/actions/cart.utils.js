export const addItemToCart2 = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};






export const addItemToCart = (cartItems, cartItemToAdd) => {
console.log("cart.utils.js cartItemToAdd._id"+cartItemToAdd._id );
  //check if product onlyOrderAvailableQty to stop adding if it out of stock

  if (cartItemToAdd.onlyOrderAvailableQty) {
    if (cartItemToAdd.availableQty === 0 || cartItemToAdd.availableQty < 0) {
      return [...cartItems]
    }
  }




  const existingCartItem = cartItems.find(
    cartItem => cartItem.productID === cartItemToAdd._id
  );
  console.log("cart.util.js cartItems" + JSON.stringify(cartItems) + "cartItemToAdd._id" + cartItemToAdd._id);

  if (existingCartItem) {
    //check if there is discount and there are limited number to buy
    console.log("cartItem is exist cart.utils.js"+ JSON.stringify(existingCartItem));
      if (cartItemToAdd.limitedOrder === existingCartItem.quantity || cartItemToAdd.limitedOrder < existingCartItem.quantity) {
        console.log("max limitedorder cart.utils.js");
        return [...cartItems]
      }
    




      console.log("increase quanitiy cart.utils.js");
    return cartItems.map(cartItem =>
      cartItem.productID === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  console.log("create new cart cart.utils.js");

  return [...cartItems, { productID: cartItemToAdd._id, quantity: 1 }];
};





export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productID === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.productID !== cartItemToRemove._id);
  }

  return cartItems.map(cartItem =>
    cartItem.productID === cartItemToRemove._id
      ? { productID: cartItemToRemove._id, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};


export const deleteItemFromCart = (cartItems, cartItemToRemove) => {


  return cartItems.filter(cartItem =>
    cartItem.productID !== cartItemToRemove._id

  );
};