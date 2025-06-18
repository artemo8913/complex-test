"use client";
import clsx from "clsx";

import { ReviewCard } from "@/2entities/review";
import { Review } from "@/2entities/review/model/review.type";

import style from "./ReviewList.module.css";
import { use } from "react";

interface ReviewCardProps {
  reviewsPromise: Promise<Review[]>;
  className?: string;
}

export default function ReviewList(props: ReviewCardProps) {
  const allReviews = use(props.reviewsPromise);

  return (
    <div className={clsx(style.ReviewList, props.className)}>
      {allReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
