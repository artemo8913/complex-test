import { Review } from "../model/review.type";

export function makeReviewHtmlMoreSafe(review: Review): Review {
  return {
    ...review,
    text: review.text.replace(/(<\/)?h1(>)/g, "$1h2$2").replace(/(<\/)?script(>)/g, "$1script_not_allow$2"),
  };
}
