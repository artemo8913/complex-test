"use client";
import clsx from "clsx";
import { ChangeEvent, useCallback } from "react";

import { Input } from "@/1shared/ui/Input";
import { Button } from "@/1shared/ui/Button";
import { useCart, useCartDisptach } from "@/2entities/cart";
import { Product } from "@/2entities/product";

import style from "./ManageProductInCart.module.css";

interface ManageProductInCartProps {
  product: Product;
  className?: string;
}

export function ManageProductInCart(props: ManageProductInCartProps) {
  const cart = useCart();
  const dispatch = useCartDisptach();

  const addToCart = useCallback(
    () =>
      dispatch({
        type: "add",
        product: {
          ...props.product,
          quantity: 1,
        },
      }),
    [dispatch, props.product]
  );

  const incrementQuantity = useCallback(() => {
    dispatch({
      type: "increment",
      productId: props.product.id,
    });
  }, [dispatch, props.product.id]);

  const decrementQuantity = useCallback(() => {
    dispatch({
      type: "decrement",
      productId: props.product.id,
    });
  }, [dispatch, props.product.id]);

  const updateQuantity = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (isNaN(value)) {
        //todo: как-то обозначить, что введено не верное значение
        return;
      }

      dispatch({
        type: "update",
        productId: props.product.id,
        quantity: Number(event.target.value),
      });
    },
    [dispatch, props.product.id]
  );

  const deleteFromCart = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === "0") {
        dispatch({ type: "delete", productId: props.product.id });
      }
    },
    [dispatch, props.product.id]
  );

  if (props.product.id in cart) {
    return (
      <div className={clsx(style.ManageProductInCart, props.className)}>
        <Button onClick={decrementQuantity}>-</Button>
        <Input
          className={style.input}
          onChange={updateQuantity}
          onBlur={deleteFromCart}
          value={cart[props.product.id].quantity}
          title={`Количество ${props.product.title}`}
        />
        <Button onClick={incrementQuantity}>+</Button>
      </div>
    );
  }

  return <Button onClick={addToCart}>купить</Button>;
}
