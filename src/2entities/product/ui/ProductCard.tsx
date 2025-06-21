"use client";
import clsx from "clsx";
import { JSX } from "react";

import { ImageWithFallback } from "@/1shared/ui/ImageWithFallback";

import style from "./ProductCard.module.css";
import { Product } from "../model/product.type";

interface ProductCardProps {
  product: Product;
  className?: string;
  control?: JSX.Element;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className={clsx(style.ProductCard, props.className)}>
      <ImageWithFallback className={style.image} alt={props.product.title} src={props.product.image_url} />
      <p className={style.title}>{props.product.title}</p>
      <p className={style.description}>{props.product.description}</p>
      <p className={style.price}>Цена: {props.product.price}₽</p>
      {props.control}
    </div>
  );
}
