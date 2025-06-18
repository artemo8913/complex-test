import { Suspense } from "react";

import { ReviewApi } from "@/2entities/review";
import ReviewList from "@/4widgets/reviewList/ui/ReviewList";

import styles from "./MainPage.module.css";

export default async function MainPage() {
  const reviews = ReviewApi.getReviews();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>тестовое задание</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewList reviewsPromise={reviews} />
        </Suspense>
      </main>
    </div>
  );
}
