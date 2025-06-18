import clsx from "clsx";
import { Review } from "@/2entities/review";

import style from "./ReviewCard.module.css";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard(props: ReviewCardProps) {
  return (
    <div className={clsx(style.ReviewCard, props.className)} dangerouslySetInnerHTML={{ __html: props.review.text }} />
  );
}
