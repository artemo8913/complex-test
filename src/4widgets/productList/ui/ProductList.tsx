"use client";
import clsx from "clsx";
import { use, useCallback, useState } from "react";

import { useInfinityScroll } from "@/1shared/hooks/useInfinityScroll";
import { GetProductsResponse, ProductApi } from "@/2entities/product";
import { ProductCard } from "@/2entities/product/ui/ProductCard";
import { ManageProductInCart } from "@/3features/manageProductInCart";

import style from "./ProductList.module.css";
import { PRODUCT_LIMIT_DEFAULT } from "../model/params.const";

interface ProductListProps {
  initialProductsPromise: Promise<GetProductsResponse>;
  className?: string;
}

export function ProductList(props: ProductListProps) {
  const initial = use(props.initialProductsPromise);

  const [productItems, setProductItems] = useState(initial.items);

  const isCanLoadMore = useCallback(() => productItems.length < initial.total, [productItems.length, initial.total]);

  const getCurrentPage = useCallback(
    () => Math.ceil(productItems.length / PRODUCT_LIMIT_DEFAULT),
    [productItems.length]
  );

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

  const { isLoading, observerElem } = useInfinityScroll(loadMoreProducts);

  return (
    <div>
      <div className={clsx(style.ProductList, props.className)}>
        {productItems.map((product) => (
          <ProductCard key={product.id} product={product} control={<ManageProductInCart product={product} />} />
        ))}
      </div>
      <div className={style.listLoader} ref={observerElem}>
        {isLoading && isCanLoadMore() && "Загрузка продуктов..."}
      </div>
    </div>
  );
}
