import { API_REVIEWS } from "@/1shared/api/const";

import { Review } from "./review.type";
import { makeReviewHtmlMoreSafe } from "../lib/makeReviewHtmlMoreSafe";

export class ReviewApi {
  static async getReviews() {
    return fetch(API_REVIEWS)
      .then((response) => response.json())
      .then((reviews: Review[]) => reviews.map(makeReviewHtmlMoreSafe))
      .catch((e) => {
        console.log(e);
        return [];
      });
  }
}
