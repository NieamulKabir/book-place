import { NavLink } from "react-router-dom";
import { IBook } from "../../types/globalTypes";
import Rating from "../Rating/Rating";

export interface IBookProps {
  book: IBook;
}

const BookCard = ({ book }: IBookProps) => {
  const { _id, image, title, author, genre, publication_date, price } =
    book;
  return (
    <div className="transform bg-[#1c212a] shadow-xl hover:-translate-y-3 to-hover hover:bg-gray-800 text-center  transition duration-300 rounded w-full mx-auto">
      <div>
        <img
          className="mx-auto w-full h-[350px] rounded-t"
          src={image}
          alt=""
        />
        <h1 className="px-5 pt-5 text-2xl font-bold text-green-400 text-start">{title}</h1>
        <p className="px-5 text-start text-sm ml-4">
          {" "}
          <span className="text-green-400 font-bold">
            {" "}
            <i className="fa-solid fa-feather"></i> By -
          </span>{" "}
          <span className="bg-green-400 text-gray-900 px-2 rounded-xl">{author}</span>
        </p>
        <div className="flex items-center justify-between mt-2 mx-8">
          <p><span className="border px-2 rounded-xl">{genre}</span></p>
          <Rating key={book?._id} book={book} />
         
        </div>

        <div className="flex items-center justify-between mt-2 mx-8">
        <p>
            <i className="fa-solid fa-upload text-green-400 font-bold"></i>{" "}
            {publication_date}
          </p>
          <p>
            {price} <i className="fa-solid fa-dollar-sign"></i>
          </p>
          
         
        </div>
      </div>

      <NavLink to={`/bookDetails/${_id}`}>
        <button className="px-6 py-2 mt-4 mb-6 bg-green-400  rounded hover:bg-white text-gray-800 transition duration-300">
          VIEW DETAILS
        </button>
      </NavLink>
    </div>
  );
};

export default BookCard;
