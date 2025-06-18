import { Suspense } from "react";

import { SearchParams } from "@/1shared/api/searchParams";
import { ReviewApi } from "@/2entities/review";
import ReviewList from "@/4widgets/reviewList/ui/ReviewList";

import styles from "./MainPage.module.css";
import { ProductApi } from "@/2entities/product";

interface MainPageParams {
  searchParams?: SearchParams;
}

export default async function MainPage(params: Promise<MainPageParams>) {
  const { searchParams } = await params;

  const reviews = ReviewApi.getReviews();
  const products = ProductApi.getProducts(searchParams);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>тестовое задание</h1>
        <Suspense fallback={<div>Загрузка отзывов</div>}>
          <ReviewList reviewsPromise={reviews} />
        </Suspense>
      </main>
    </div>
  );
}
