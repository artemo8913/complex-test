"use client";
import clsx from "clsx";
import { use } from "react";

import { GetProductsResponse } from "@/2entities/product";

import style from "./ProductList.module.css";
import { ProductCard } from "@/2entities/product/ui/ProductCard";

interface ProductListProps {
  productPromise: Promise<GetProductsResponse>;
  className?: string;
}

export function ProductList(props: ProductListProps) {
  const getProductResponse = use(props.productPromise);

  return (
    <div className={clsx(style.ProductList, props.className)}>
      {getProductResponse.items.map((product) => (
        <ProductCard key={product.id} product={product} control={<div>Кнопки управления</div>} />
      ))}
    </div>
  );
}
