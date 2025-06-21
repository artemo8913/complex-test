"use client";
import clsx from "clsx";
import { FormEvent, useCallback, useState, useTransition } from "react";

import { Button } from "@/1shared/ui/Button";
import { PhoneInput } from "@/1shared/ui/PhoneInput";
import { OrderApi, useCart } from "@/2entities/cart";

import { CartListItem } from "./CartListItem";

import style from "./Cart.module.css";
import toast from "react-hot-toast";

interface CartProps {
  className?: string;
}

export function Cart(props: CartProps) {
  const cart = useCart();
  const items = Object.entries(cart);
  const [isLoading, startOrder] = useTransition();

  const [phone, setPhone] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (phone && items.length) {
        startOrder(async () => {
          const response = await OrderApi.makeOrder(
            phone.replace(/\D/g, ""),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            items.map(([_id, cartItem]) => ({ id: cartItem.id, quantity: cartItem.quantity }))
          );
          toast(JSON.stringify(response));
        });
      }
    },
    [items, phone]
  );

  return (
    <form onSubmit={handleSubmit} className={clsx(style.Cart, props.className)}>
      <div className={style.container}>
        <div className={style.title}>Добавленные товары</div>
        <ul>
          {items.map(([productId, cartItem]) => (
            <CartListItem key={productId} cartItem={cartItem} />
          ))}
        </ul>
        <PhoneInput isRequired value={phone} handleChange={setPhone} />
      </div>
      <Button isDisabled={isLoading} type="submit" className={style.makeOrderButton} onClick={() => {}}>
        заказать
      </Button>
    </form>
  );
}
