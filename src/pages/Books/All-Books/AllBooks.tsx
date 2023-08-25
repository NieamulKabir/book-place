import { useGetBooksQuery } from "../../../redux/features/books/booksApi";
import { IBook } from "../../../types/globalTypes";
import BookCard from "../../../components/BookCard/BookCard";
import BooksSkeleton from "../../../components/ui/skeletons/books/BooksSkeleton"

import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  clearFilter,
  search,
  selectedGenre,
  selectedYear,
} from "../../../redux/features/search/searchSlice";

const yearSelect = () => {
  const years = [];
  for (let year = 1813; year <= 2023; year++) {
    years.push(year);
  }
  return years;
};
const AllBooks = () => {
  const dispatch = useAppDispatch();
  const { data: booksData ,isLoading} = useGetBooksQuery(undefined);

  const allBooks = booksData?.data;

 
  let bookContent;
  const searchValue = useAppSelector((state) => state.search.keyword);
  const genreValue = useAppSelector((state) => state.search.genre);
  const publishedYearValue = useAppSelector(
    (state) => state.search.published_year
  );
  const handleClear = () => {
    dispatch(clearFilter());
    selectedGenre(dispatch(clearFilter()));
  };

  // search filter
  if (searchValue !== "" && genreValue === "" && publishedYearValue === "") {
    bookContent = allBooks?.filter(
      (book: IBook) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // if all selected
  if (searchValue !== "" && genreValue !== "" && publishedYearValue !== "") {
    bookContent = allBooks
      ?.filter(
        (book: IBook) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter(
        (book: IBook) => book.genre.toLowerCase() === genreValue.toLowerCase()
      )
      .filter((book: IBook) =>
        book.publication_date.includes(publishedYearValue)
      );
  }
  // if  no search value
  if (searchValue === "" && genreValue !== "" && publishedYearValue !== "") {
    bookContent = allBooks
      ?.filter(
        (book: IBook) => book.genre.toLowerCase() === genreValue.toLowerCase()
      )
      .filter((book: IBook) =>
        book.publication_date.includes(publishedYearValue)
      );
  }
  // if no year is selected
  if (searchValue !== "" && genreValue !== "" && publishedYearValue === "") {
    bookContent = allBooks
      ?.filter(
        (book: IBook) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter(
        (book: IBook) => book.genre.toLowerCase() === genreValue.toLowerCase()
      );
  }

  // if no genre is selected
  if (searchValue !== "" && genreValue === "" && publishedYearValue !== "") {
    bookContent = allBooks
      ?.filter(
        (book: IBook) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((book: IBook) =>
        book.publication_date.includes(publishedYearValue)
      );
  }
  if (searchValue === "" && genreValue === "" && publishedYearValue !== "") {
    bookContent = allBooks?.filter((book: IBook) =>
      book.publication_date.includes(publishedYearValue)
    );
  }
  if (searchValue === "" && genreValue !== "" && publishedYearValue === "") {
    bookContent = allBooks?.filter(
      (book: IBook) => book.genre.toLowerCase() === genreValue.toLowerCase()
    );
  }
  if (searchValue === "" && genreValue === "" && publishedYearValue === "") {
    bookContent = allBooks;
  }


  return (
    <div className="bg-gray-900 py-28">
        {isLoading && <BooksSkeleton />}
      <h1 className="text-center text-2xl md:text-4xl text-green-400  font-bold">
        Explore Your Desire Book{" "}
      </h1>
      <p className="text-center text-gray-400 text-lg">
        "Unlock Your Mind, Read a Book!"
      </p>
      <p className="text-center text-gray-400  pb-10">
        Explore All New Added Books
      </p>
      <div className="text-white md:flex justify-evenly pb-16">
        <div className="lg:flex">
          <div className="border-1 rounded-md  mr-2 px-2">
            {" "}
            <input
              className="input input-bordered bg-gray-900 border-white w-full  md:w-[380px] "
              type="text"
              value={searchValue}
              placeholder="Search your book (title, Genre, Author)....... 📖"
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </div>

          <div className="text-gray-300 mr-2 px-2 py-2  md:p-0">
            <select
              onChange={(e) => dispatch(selectedGenre(e.target.value))}
              className="select border-2 border-white  md:max-w-[200px] bg-gray-900 text-gray-300"
            >
              <option className="text-white" defaultValue="" >
                Pick a Genre
              </option>
              <option className="text-white" value="">
                None
              </option>
              <option className="text-white" value="Fiction">
                Fiction
              </option>
              <option className="text-white" value="Non-Fiction">
                Non-Fiction
              </option>
              <option className="text-white" value="Romance">
                Romance
              </option>
              <option className="text-white" value="Mystery">
                Mystery
              </option>
              <option className="text-white" value="Fantasy">
                Fantasy
              </option>
              <option className="text-white" value="Biography">
                Biography
              </option>
              <option className="text-white" value="Horror">
                Horror
              </option>
            </select>
          </div>
          <div className="mr-2 p-2 md:p-0 text-gray-300">
            <select
              onChange={(e) => dispatch(selectedYear(e.target.value))}
              className="select border-2 border-white  md:max-w-[200px] bg-gray-900 text-gray-300"
            >
              <option className="text-white" defaultValue="" >
                Select A Year
              </option>
              {yearSelect().map((year) => (
                <option className="text-white" key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <button
              // value={clear}
              onClick={() => handleClear()}
              className="btn bg-gray-900 text-white ml-2 hover:bg-red-500 p-2 mb-3 px-4"
            >
             <i className="fa-solid fa-circle-xmark text-lg"></i> Clear
            </button>
          </div>
        </div>

        <div className="ml-2">
          <button className="border px-4 py-2.5 hover:bg-green-400 hover:text-gray-900 rounded-lg  mb-6">
            <NavLink to="/addBook"><i className="fa-solid fa-circle-plus text-lg mr-2"></i>Add Book</NavLink>
          </button>
        </div>
      </div>
      <div className="w-9/12  text-white grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
        {bookContent?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
