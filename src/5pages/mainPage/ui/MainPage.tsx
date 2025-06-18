import { Suspense } from "react";

import { SearchParams } from "@/1shared/api/searchParams";
import { ReviewApi } from "@/2entities/review";
import { ReviewList } from "@/4widgets/reviewList";

import styles from "./MainPage.module.css";
import { ProductApi } from "@/2entities/product";
import { ProductList } from "@/4widgets/productList";

interface MainPageParams {
  searchParams?: Promise<SearchParams>;
}

export default async function MainPage(props: MainPageParams) {
  const reviews = ReviewApi.getReviews();
  const products = ProductApi.getProducts(await props.searchParams);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>тестовое задание</h1>
        <Suspense fallback={<div>Загрузка отзывов</div>}>
          <ReviewList reviewsPromise={reviews} />
        </Suspense>
        <Suspense fallback={<div>Загрузка товаров</div>}>
          <ProductList productPromise={products} />
        </Suspense>
      </main>
    </div>
  );
}
