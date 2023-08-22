import { useForm } from "react-hook-form";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../redux/hook";
import { IBook } from "../../../types/globalTypes";
import { usePostBookMutation } from "../../../redux/features/books/booksApi";

export default function AddBook() {
  const { user } = useAppSelector((state) => state.user);
  const [addBook, { isSuccess, isError /* isLoading */ }] = usePostBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    const payload = { ...data, addedBy: user.email };
    addBook(payload);
    reset();
    console.log(payload);
    // console.log(addBook(payload));
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Successfully added the book 📘", { id: "addBook" });
    if (isError) toast.error("Failed to add the book 😔", { id: "error" });
  }, [isSuccess, isError]);

  return (
    <div className="pt-32 px-3">
      <h2 className="text-green-400 text-center text-xl md:text-3xl font-bold pb-10">Add New Book</h2>
      <div className="card flex-shrink-0 w-full max-w-sm md:max-w-xl shadow-2xl bg-gray-900 mx-auto">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-green-400 font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Book Title"
              className="input input-bordered bg-gray-700 text-white"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className=" text-red-400">{errors.title.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Author</span>
            </label>
            <input
              type="text"
              placeholder="Author Name"
              className="input input-bordered bg-gray-700 text-white"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className=" text-red-400">{errors.author.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Genre</span>
            </label>
            <select
              className="select w-full  bg-gray-700 text-white"
              {...register("genre", { required: "Genre is required" })}
            >
              <option selected>Select Genre</option>
              <option>Fantasy</option>
              <option>Thrillers</option>
              <option>Biography</option>
              <option>Romance</option>
              <option>Mystery</option>
              <option>Horror</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
            </select>
            {errors.genre && (
              <p className="text-red-400">{errors.genre.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Descriptions</span>
            </label>
            <input
              type="text"
              placeholder="Book Description"
              className="input input-bordered bg-gray-700 text-white"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-red-400">{errors.description.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Publication Date</span>
            </label>
            <input
              type="date"
              // placeholder="Jhankar Mahbub"
              className="input input-bordered bg-gray-700 text-white"
              {...register("publication_date", {
                required: "Publication Date is required",
              })}
            />
            {errors.publication_date && (
              <p className="text-red-400">{errors.publication_date.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Image</span>
            </label>
            <input
              type="text"
              placeholder="image url"
              className="input input-bordered bg-gray-700 text-white"
              {...register("image", { required: "Image Required" })}
            />
            {errors.image && (
              <p className="text-red-400">{errors.image.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-green-400 font-semibold">Price</span>
            </label>
            <input
              type="text"
              placeholder="Book Price"
              className="input input-bordered bg-gray-700 text-white"
              {...register("price", { required: "Price Required" })}
            />
            {errors.price && (
              <p className="text-red-400">{errors.price.message}</p>
            )}
          </div>
          


          <div className="form-control mt-6">
            <button className="btn bg-green-400 border-0">Add Book</button>
          </div>
        </form>
      </div>
      
    </div>
  );
}
