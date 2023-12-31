import { IBook,  IReviews } from "../../types/globalTypes";


export default function ratingCount(book: IBook) {
  let totalRating = 0;
  let finalRating = 0;

  book?.reviews?.forEach((review: IReviews) => {
    totalRating = totalRating + (review?.rating ? review?.rating : 0);
  });

  if (book?.reviews?.length) {
    finalRating = totalRating / book?.reviews?.length;
  }
  return finalRating;
}
