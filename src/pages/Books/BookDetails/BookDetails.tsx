import { useParams } from "react-router-dom";
import { useGetBooksQuery, useSingleBookQuery } from "../../../redux/features/books/booksApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toast } from "react-hot-toast";
import {
  useAddWishListMutation,
  useGetWishListQuery,
} from "../../../redux/features/wishList/wishListApi";
import {
  addToWishList,
 
} from "../../../redux/features/wishList/wishListSlice";
import { useGetUserQuery } from "../../../redux/features/users/userApi";
import Reviews from "../../Reviews/Reviews";

//  interface IWishlist {
//   _id: string;
//   book?: ISingleBook;
//   user?: IUser;
// }
const BookDetails = () => {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { data } = useGetUserQuery(user?.email);

  const { data: wishlist } = useGetWishListQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
 
  const reviews= book?.data?.reviews??[]


  const [addWishList] = useAddWishListMutation();

  const handleAddWishList = () => {
    const payload = { userId: user?.email, bookId: book?.data?._id };

    dispatch(addToWishList(book));
    addWishList(payload);
    toast.success("Added To Wishlist.");
    // console.log(wishLists?.books);
  };
  // const handleRemoveFromWishList = () => {
  //   wishLists?.books.forEach((list) => {
  //     if (list?.books?.data._id === book?.data?._id) {
  //       removeFromWishList(list?._id);
  //       console.log(list?.id);

  //       toast.error("Removed From Wishlist");
  //     }
  //   });

  return (
    <>
      <div>
        <h1 className="mt-20">hwllo</h1>

        <div className="mx-4">
          <div className="card lg:card-side bg-gray-900 shadow-xl max-w-7xl mx-auto border-b text-white ">
            <figure className="md:w-[40%]">
              <img
                className="pt-6 md:py-6 md:pl-6 "
                src={book?.data?.image}
                alt="Album"
              />
            </figure>
            <div className="card-body md:w-[60%]">
              <h2 className="text-2xl lg:text-4xl font-bold">
                {book?.data?.title}
              </h2>
              <h3 className="text-sm md:ml-8 -mt-2">
                <span className="text-green-400 font-bold">
                  <i className="fa-solid fa-feather"></i> By -
                </span>{" "}
                {book?.data?.author}
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
                <span className="text-green-400 font-bold">
                  {book?.data?.genre}
                </span>
              </h3>
              <h3 className="">
                {" "}
                <i className="fa-solid fa-circle-arrow-right text-green-400 font-bold"></i>{" "}
                Publication On :{" "}
                <span className="text-green-400 font-bold">
                  {book?.data?.publication_date}
                </span>
              </h3>
              <h3>
                {" "}
                {book?.data?.rating}{" "}
                <i className="fa-solid fa-star text-green-400 font-bold"></i>
              </h3>{" "}
              <h3>
                {book?.data?.price}
                <i className="fa-solid fa-dollar-sign text-green-400 font-bold"></i>
              </h3>
              <hr />
              <h1 className="text-xl md:text-2xl font-semibold text-green-400">
                Here is Some Feature You can use and Enjoy it.
              </h1>
              <div className="text-2xl">
                <button onClick={handleAddWishList}>
                  <p className="">
                    <i className="fa-solid fa-heart mr-3"></i>{" "}
                  </p>
                </button>

                <button>
                  {" "}
                  <i className="fa-solid fa-square-check mr-3"></i>
                </button>
                <button>
                  <i className="fa-brands fa-readme mr-3"></i>
                </button>
              </div>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div> */}
            </div>
          </div>
        </div>
        <Reviews reviews={reviews} bookId={id!}/>
      </div>
    </>
  );
};

export default BookDetails;