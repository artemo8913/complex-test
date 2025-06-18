"use client";
import clsx from "clsx";
import { use, useCallback, useEffect, useRef, useState, useTransition } from "react";

import { GetProductsResponse, ProductApi } from "@/2entities/product";
import { ProductCard } from "@/2entities/product/ui/ProductCard";

import style from "./ProductList.module.css";
import { PRODUCT_LIMIT_DEFAULT } from "../model/params.const";

interface ProductListProps {
  initialProductsPromise: Promise<GetProductsResponse>;
  className?: string;
}

export function ProductList(props: ProductListProps) {
  const initial = use(props.initialProductsPromise);
  const [productItems, setProductItems] = useState(initial.items);

  const [isLoading, startLoad] = useTransition();

  const isCanLoadMore = useCallback(() => productItems.length < initial.total, [productItems.length, initial.total]);

  const getCurrentPage = useCallback(
    () => Math.ceil(productItems.length / PRODUCT_LIMIT_DEFAULT),
    [productItems.length]
  );

  const observerElem = useRef(null);

  const loadMoreProducts = useCallback(async () => {
    if (!isCanLoadMore()) {
      return;
    }

    const productResponse = await ProductApi.getProducts({
      page: getCurrentPage() + 1,
      page_size: PRODUCT_LIMIT_DEFAULT,
    });

    setProductItems((products) => [...products, ...productResponse.items]);
  }, [getCurrentPage, isCanLoadMore]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting && isCanLoadMore() && !isLoading) {
        startLoad(loadMoreProducts);
      }
    },
    [isCanLoadMore, isLoading, loadMoreProducts]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  return (
    <div>
      <div className={clsx(style.ProductList, props.className)}>
        {productItems.map((product) => (
          <ProductCard key={product.id} product={product} control={<div>Кнопки управления</div>} />
        ))}
      </div>
      <div className={style.listLoader} ref={observerElem}>
        {isLoading ? "Загрузка продуктов..." : ""}
      </div>
    </div>
  );
}
