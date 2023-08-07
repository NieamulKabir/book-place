import { useState, FormEvent, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { IReviews } from "../../types/globalTypes";
import { useAppSelector } from "../../redux/hook";
import { useGetUserByEmailQuery } from "../../redux/features/users/userApi";
import { useUpdateBookMutation } from "../../redux/features/books/booksApi";

interface IProps {
  reviews: IReviews[];
  bookId: string;
}
const Reviews = ({ reviews, bookId }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const [updateBook, { isSuccess }] = useUpdateBookMutation();
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating <= 0) {
      setError("Please Give your Rating");
    } else {
      setError("");
      const commentText = e.target as typeof e.target & {
        comment: { value: string };
      };
      const comment = e.target as HTMLFormElement;

      const commentData = {
        user_id: getUser?.data?.userName,
        rating: rating,
        comment: commentText.comment.value,
      };
      const data = {
        reviews: [...reviews, commentData],
      };
      updateBook({ bookId, data })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });

      comment.reset();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setRating(0);
    }
  }, [isSuccess, rating]);
  return (
    <div>
      <div>{reviews.length > 0 ? "" : <p className="">No reviews yet</p>}</div>
      {user?.email && (
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="comment"
            placeholder="Write Your comment"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <Rating
            initialValue={rating}
            size={28}
            allowFraction
            onClick={handleRating}
            showTooltip
            tooltipArray={[
              "Terrible",
              "Terrible+",
              "Bad",
              "Bad+",
              "Average",
              "Average+",
              "Great",
              "Great+",
              "Awesome",
              "Awesome+",
            ]}
            transition
          />
          <p className="ms-2 text-danger"> {error && error}</p>
          <button className="text-white" type="submit">Submit</button>
        </form>
      )}

      <div className="text-white pb-20">
        {reviews?.map((review) => (
          <div>
            <h1>{review?.user_id}</h1>
            <Rating
              allowFraction
              initialValue={review?.rating}
              size={20}
              readonly
            />
            <p className="text-white">{review?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
