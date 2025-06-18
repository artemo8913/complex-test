"use client";
import clsx from "clsx";
import { JSX } from "react";

import style from "./ProductCard.module.css";
import { Product } from "../model/product.type";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  className?: string;
  control?: JSX.Element;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className={clsx(style.ProductCard, props.className)}>
      <Image alt={props.product.title} src={props.product.image_url} fill unoptimized />
      <p className={style.title}>{props.product.title}</p>
      <p className={style.description}>{props.product.description}</p>
      <p className={style.price}>Цена: {props.product.price}₽</p>
      {props.control}
    </div>
  );
}
