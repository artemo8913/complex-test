import { Suspense } from "react";

import { ReviewApi } from "@/2entities/review";
import { ProductApi } from "@/2entities/product";
import { Cart } from "@/4widgets/cart";
import { ReviewList } from "@/4widgets/reviewList";
import { PRODUCT_LIMIT_DEFAULT, PRODUCT_PAGE_DEFAULT, ProductList } from "@/4widgets/productList";

import styles from "./MainPage.module.css";

export default async function MainPage() {
  const reviewsPromise = ReviewApi.getReviews();
  const initialProductsPromise = ProductApi.getProducts({
    page: PRODUCT_PAGE_DEFAULT,
    page_size: PRODUCT_LIMIT_DEFAULT,
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>тестовое задание</h1>
        <Suspense fallback={<div>Загрузка отзывов</div>}>
          <ReviewList reviewsPromise={reviewsPromise} />
        </Suspense>
        <Cart className={styles.cart} />
        <Suspense fallback={<div>Загрузка товаров</div>}>
          <ProductList initialProductsPromise={initialProductsPromise} />
        </Suspense>
      </main>
    </div>
  );
}
