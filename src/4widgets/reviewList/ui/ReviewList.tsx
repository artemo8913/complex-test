"use client";
import clsx from "clsx";
import { use } from "react";

import { Review, ReviewCard } from "@/2entities/review";

import style from "./ReviewList.module.css";

interface ReviewListProps {
  reviewsPromise: Promise<Review[]>;
  className?: string;
}

export function ReviewList(props: ReviewListProps) {
  const allReviews = use(props.reviewsPromise);

  return (
    <div className={clsx(style.ReviewList, props.className)}>
      {allReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
