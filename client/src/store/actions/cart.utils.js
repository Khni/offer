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
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productID === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.productID === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { productID:cartItemToAdd._id , quantity: 1 }];
};





export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem =>  cartItem.productID  === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.productID !== cartItemToRemove._id);
  }

  return cartItems.map(cartItem =>
    cartItem.productID === cartItemToRemove._id
      ? { productID:cartItemToRemove._id, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};