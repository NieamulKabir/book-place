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
      <div className="card flex-shrink-0 w-full max-w-sm md:max-w-xl shadow-2xl bg-base-200 mx-auto">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Book Title"
              className="input input-bordered"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="form_error">{errors.title.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              placeholder="Author Name"
              className="input input-bordered"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className="form_error">{errors.author.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <select
              className="select w-full max-w-xs"
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
              <p className="form_error">{errors.genre.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descriptions</span>
            </label>
            <input
              type="text"
              placeholder="Book Description"
              className="input input-bordered"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="form_error">{errors.description.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Publication Date</span>
            </label>
            <input
              type="date"
              // placeholder="Jhankar Mahbub"
              className="input input-bordered"
              {...register("publication_date", {
                required: "Publication Date is required",
              })}
            />
            {errors.publication_date && (
              <p className="form_error">{errors.publication_date.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              placeholder="Book Description"
              className="input input-bordered"
              {...register("image", { required: "Image Required" })}
            />
            {errors.image && (
              <p className="form_error">{errors.image.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              placeholder="Book Description"
              className="input input-bordered"
              {...register("price", { required: "Price Required" })}
            />
            {errors.price && (
              <p className="form_error">{errors.price.message}</p>
            )}
          </div>
          


          <div className="form-control mt-6">
            <button className="btn btn-primary">Add Book</button>
          </div>
        </form>
      </div>
      
    </div>
  );
}
