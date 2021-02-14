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
	
	//check if product onlyOrderAvailableQty to stop adding if it out of stock
 
            if (cartItemToAdd.onlyOrderAvailableQty) {
                if (cartItemToAdd.availableQty === 0 || cartItemToAdd.availableQty < 0) {
                    return [...cartItems]
                }
            }

            
	
	
  const existingCartItem = cartItems.find(
    cartItem => cartItem.productID === cartItemToAdd._id
  );

  if (existingCartItem) {
  	//check if there is discount and there are limited number to buy
            if (cartItemToAdd.discount.isActive && cartItemToAdd.discount.limitedOrder !== 0) {
                if (cartItemToAdd.discount.limitedOrder === existingCartItem.quantity || cartItemToAdd.discount.limitedOrder < existingCartItem.quantity) {
                  return [...cartItems]
                }
            }
  
  
  
  
  
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