import { Reducer } from "react";

import { Cart, CartItem } from "./cart.type";

export type CartAction =
  | { type: "initiate"; cart: Cart }
  | { type: "add"; product: CartItem }
  | { type: "update"; productId: number; quantity: number }
  | { type: "increment"; productId: number }
  | { type: "decrement"; productId: number }
  | { type: "delete"; productId: number };

export const cartReducer: Reducer<Cart, CartAction> = (cart, action) => {
  switch (action.type) {
    case "initiate": {
      return action.cart;
    }
    case "add": {
      return { ...cart, [action.product.id]: action.product };
    }
    case "update": {
      if (action.quantity < 0) {
        delete cart[action.productId];
        return { ...cart };
      }
      return { ...cart, [action.productId]: { ...cart[action.productId], quantity: action.quantity } };
    }
    case "increment": {
      const newValue = cart[action.productId].quantity++;
      return { ...cart, [action.productId]: { ...cart[action.productId], quantity: newValue } };
    }
    case "decrement": {
      const newValue = cart[action.productId].quantity--;
      if (newValue <= 0) {
        delete cart[action.productId];
        return { ...cart };
      }
      return { ...cart, [action.productId]: { ...cart[action.productId], quantity: newValue } };
    }
    case "delete": {
      delete cart[action.productId];
      return { ...cart };
    }
    default: {
      throw Error(`Unknown action: ${action}`);
    }
  }
};
