import { useState, FormEvent, useEffect } from "react";
// import { Rating } from "react-simple-star-rating";
import { IReviews } from "../../types/globalTypes";
import { useAppSelector } from "../../redux/hook";
import { useGetUserQuery } from "../../redux/features/users/userApi";
import { useUpdateBookMutation } from "../../redux/features/books/booksApi";
import userImg from "../../assets/user.png";
interface IProps {
  reviews: IReviews[];
  id: string;
}

const Reviews = ({ reviews, id }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserQuery(user.email!);
  const [updateBook, { isSuccess }] = useUpdateBookMutation();
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  // const handleRating = (rate: number) => {
  //   setRating(rate);

  //   // other logic
  // };

  console.log(getUser);
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
        user_id: getUser?.data?._id,
        rating: rating,
        comment: commentText.comment.value,
      };
      const data = {
        reviews: [...reviews, commentData],
      };
      updateBook({ id, data })
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
    <div className=" w-11/12 mx-auto">
      <h1 className="text-green-400 text-xl md:text-3xl lg:text-4xl font-bold mt-10 mb-3">
        Reviews
      </h1>

      {user?.email && (
        <form className="flex" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="comment"
            placeholder="Write Your comment"
            className="input input-bordered border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-xs mr-2"
          />
          {/* <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            onClick={handleRating}
            // onChange={setRating}
          /> */}
          {/* <Rating

            initialValue={rating}
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
              "Awesome+",
            ]}
            transition
          /> */}
          <input
            placeholder="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-[50px] mr-2"
            required
          />
          <button
            className="border text-white px-3 rounded-xl font-bold hover:bg-green-400 hover:text-gray-900"
            type="submit"
          >
            Submit
          </button>{" "}
          <br />
        </form>
      )}
      <p className="ms-2 text-red-500 my-2 ">
        {" "}
        <span className="px-2 py-1 rounded-xl">{error && error}</span>
      </p>
      <div>
        {reviews.length > 0 ? (
          ""
        ) : (
          <p className="text-white pt-2 text-xl">No Reviews Yet</p>
        )}
      </div>

      {reviews.length !== 0 && (
        <div className="text-white  border  py-3 px-4 rounded-2xl bg-gray-900">
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="flex justify-between items-center border m-3 px-4 pt-4 rounded-lg bg-gray-600"
            >
              <div className="pb-4">
                <div className="flex items-center">
                  <img
                    src={review.user_image ? review.user_image : userImg}
                    alt={review.user_id}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="ml-1">{getUser?.data?.userName}</p>
                </div>
                <p className="text-white flex pl-4">{review?.comment}</p>
              </div>
              <p>
                {review?.rating}
                <i className="fa-solid fa-star" />
              </p>
              {/* <div className="flex-col">
              <Rating
                allowFraction
                initialValue={review?.rating}
                size={20}
                readonly
              />
            </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
