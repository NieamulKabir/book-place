import { useParams } from "react-router-dom";
import {
//   useGetBooksQuery,
  useSingleBookQuery,
} from "../../redux/features/books/booksApi";
import { IReviews, ISingleBook } from "../../types/globalTypes";
import BookDetailCard from "../../components/BookDetailCard";
import Reviews from "../Reviews/Reviews";

const BookDetail = () => {
  const { id: bookId } = useParams();

//   const { data: allBooks } = useGetBooksQuery(undefined);
  const { data: bookData, isLoading } = useSingleBookQuery(bookId!);
  const book: ISingleBook = bookData?.data as ISingleBook;
  const reviews: IReviews[] | undefined = bookData?.data?.reviews ?? [];

  if (isLoading) {
    <p>Loading....</p>;
  }
  return (
    <>
      <BookDetailCard book={book} />
      <Reviews reviews={reviews!} bookId={bookId!} />
    </>
  );
};

export default BookDetail;
