"use client";
import { CartItem } from "@/2entities/cart";

import style from "./Cart.module.css";

interface CartListItemProps {
  cartItem: CartItem;
  className?: string;
}

export function CartListItem(props: CartListItemProps) {
  return (
    <li className={style.CartListItem}>
      <div className={style.itemName}>{props.cartItem.title}</div>
      <div className={style.itemQuantity}>x{props.cartItem.quantity}</div>
      <div className={style.itemPrice}>{(props.cartItem.quantity * props.cartItem.price).toFixed(0)}₽</div>
    </li>
  );
}
