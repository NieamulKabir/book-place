import { IBook, IWishlist } from "../types/globalTypes";
import Rating from "./Rating/Rating";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppSelector } from "../redux/hook";
import {
  useGetUserByEmailQuery,
  useGetUserQuery,
} from "../redux/features/users/userApi";

import {
  useAddWishListMutation,
  useGetWishListQuery,
} from "../redux/features/wishList/wishListApi";
import { removeFromWishList } from "../redux/features/wishList/wishListSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDeleteBookMutation } from "../redux/features/books/booksApi";
import { toast } from "react-hot-toast";
import DeleteModal from "./ui/deleteModal/DeleteModal";

interface IProps {
  book: IBook;
}

const BookDetailCard = ({ book }: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  //user data
  const { user } = useAppSelector((state) => state.user);
  const { data: getUser } = useGetUserByEmailQuery(user.email!);
  const { data } = useGetUserQuery(user.email!);

  //wishlist
  const [addToWishlist, { isLoading }] = useAddWishListMutation();
  const { data: wishlist } = useGetWishListQuery(data?.data?._id);
  console.log(wishlist?.data);

  const handleAddWishList = () => {
    const payload = { userId: getUser?.data?._id, bookId: book?._id };
    console.log(payload);
    addToWishlist(payload);
  };
  const handleRemoveFromWishList = () => {
    wishlist?.data?.forEach((list: IWishlist) => {
      if (list?.book?._id === book?._id) {
        removeFromWishList(list?._id);
      }
    });
  };

  //delete item
  // modal
  const [deleteBook] = useDeleteBookMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    if (getUser?.data?.email === book?.addedBy) {
      deleteBook(id);
      toast.success("Book Deleted Successfully");
      navigate("/allBooks");
    } else {
      toast.error("Sorry! You can only Delete book that added by you");
    }
  };
  const handleDeleteOpenModal = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    <p>Loading</p>;
  }
  return (
    <>
      <div>
        <h1 className="mt-20">hello</h1>

        <div className="mx-4">
          <div className="card lg:card-side bg-gray-900 shadow-xl max-w-7xl mx-auto border-b text-white ">
            <figure className="md:w-[40%]">
              <img
                className="pt-6 md:py-6 md:pl-6 "
                src={book?.image}
                alt="Album"
              />
            </figure>
            <div className="card-body md:w-[60%]">
              <h2 className="text-2xl lg:text-4xl font-bold">{book?.title}</h2>
              <h3 className="text-sm md:ml-8 -mt-2">
                <span className="text-green-400 font-bold">
                  <i className="fa-solid fa-feather"></i> By -
                </span>{" "}
                {book?.author}
              </h3>
              <hr />
              <h3 className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates error ullam repudiandae officia qui natus officiis
                nostrum ab quibusdam ratione? Adipisci maiores expedita quaerat
                ullam, officia rerum dolores culpa eligendi totam in similique
                ipsam? Officia temporibus ad magnam quaerat eos repellendus
                aliquam. Impedit ipsum minima velit debitis saepe nemo a ducimus
                placeat aut dolorum ratione rerum eum nam, fugit quos
                voluptatibus eius, tenetur architecto? Hic eveniet nam
                exercitationem perspiciatis aliquam facilis, quia, ducimus modi
                fugiat tempora, eaque pariatur vitae obcaecati nemo odit
                deserunt dicta ipsa molestiae voluptate. Saepe reiciendis,
                officia voluptas amet itaque totam debitis excepturi quisquam
                eos asperiores maiores.
              </h3>
              <h3 className="">
                {" "}
                <i className="fa-solid fa-circle-arrow-right text-green-400 font-bold"></i>{" "}
                Genre :{" "}
                <span className="text-green-400 font-bold">{book?.genre}</span>
              </h3>
              <h3 className="">
                {" "}
                <i className="fa-solid fa-circle-arrow-right text-green-400 font-bold"></i>{" "}
                Publication On :{" "}
                <span className="text-green-400 font-bold">
                  {book?.publication_date}
                </span>
              </h3>
              <h3>
                <Rating key={book?._id} book={book} />
              </h3>
              <h3>
                {book?.price}
                <i className="fa-solid fa-dollar-sign text-green-400 font-bold"></i>
              </h3>
              <hr />
              <h1 className="text-xl md:text-2xl font-semibold text-green-400">
                Here is Some Feature You can use and Enjoy it.
              </h1>

              <div className="flex">
                {/* {wishlist?.data?.find(
                    (list:IWishlist) => list?.book?._id === book?._id
                  ) && ( */}
                <BsFillHeartFill
                  onClick={handleRemoveFromWishList}
                  className="text-lg mx-1 text-red-600"
                ></BsFillHeartFill>
                {/* )} */}
                {/* {!wishlist?.data?.find(
                    (list:IWishlist) => list?.book?._id === book?._id
                  ) && ( */}
                <AiOutlineHeart
                  onClick={handleAddWishList}
                  className="text-xl mx-1"
                ></AiOutlineHeart>
                {/* )} */}
              </div>

              {book?.addedBy === user?.email && (
                <div className="flex item-center">
                  <button
                    className="flex justify-center items-center bg-gray-700 px-3 py-1 rounded-lg mr-3"
                    onClick={() => navigate(`/editBook/${book._id!}`)}
                  >
                    <i className="fa-solid fa-pen-to-square text-lg font-bold"></i>
                    <span className="mx-2"> Edit</span>{" "}
                  </button>
                  {/* delete modal  */}

                  <button
                    onClick={handleDeleteOpenModal}
                    className="flex justify-center items-center bg-gray-700 px-3 py-1 rounded-lg"
                  >
                    <i className="fa-solid fa-trash-can text-lg font-bold"></i>
                    <span className="mx-2"> Delete</span>{" "}
                  </button>
                  {isDeleteModalOpen && (
                    <DeleteModal
                      onDelete={handleDelete}
                      onCancel={handleDeleteCloseModal}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailCard;
