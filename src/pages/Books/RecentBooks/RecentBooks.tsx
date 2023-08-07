import { Link } from "react-router-dom";
import BookCard from "../../../components/BookCard/BookCard";
import { useGetBooksQuery } from "../../../redux/features/books/booksApi";
import { IBook } from "../../../types/globalTypes";

const RecentBooks = () => {
  const { data: booksData } = useGetBooksQuery(undefined);
  const allBooks = booksData?.data?.slice();
  return (
    <div className="bg-gray-900 py-10">
      <h1 className="text-center text-2xl md:text-4xl text-green-400  font-bold">
        Explore Your Desire Book{" "}
      </h1>
      <p className="text-center text-gray-400 text-lg">
        "Unlock Your Mind, Read a Book!"
      </p>
      <p className="text-center text-gray-400  pb-10">
        Explore All New Added Books
      </p>
      <div className="w-9/12  text-white grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
        {allBooks?.slice(0, 9).map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <h1 className="text-center mt-6">
        <Link
          to="/allBooks"
          className="bg-green-400 rounded-xl  my-2  p-2 px-5 hover:bg-white text-gray-900 transition duration-300 "
        >
          {" "}
          Explore More Books{" "}
          <i className="fa-solid fa-circle-arrow-right text-xl ml-2"></i>
        </Link>
      </h1>
    </div>
  );
};

export default RecentBooks;
