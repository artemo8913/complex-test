"use client";
import { ActionDispatch, createContext, PropsWithChildren, useContext, useEffect, useReducer } from "react";

import { Cart } from "../model/cart.type";
import { CartAction, cartReducer } from "../model/cart.reducer";

const LOCAL_STORAGE_CART_KEY = "cart";
const INITIAL_CART: Cart = {};

const CartContext = createContext(INITIAL_CART);
const CartDispatchContext = createContext((() => {}) as ActionDispatch<[action: CartAction]>);

export const useCart = () => useContext(CartContext);

export const useCartDisptach = () => useContext(CartDispatchContext);

export function CartProvider(props: PropsWithChildren) {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    if (value) {
      const cart = JSON.parse(value);

      dispatch({ type: "initiate", cart });
    }
  }, []);

  useEffect(() => localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart)), [cart]);

  return (
    <CartContext value={cart}>
      <CartDispatchContext value={dispatch}>{props.children}</CartDispatchContext>
    </CartContext>
  );
}
