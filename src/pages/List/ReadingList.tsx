
import { useAppSelector } from "../../redux/hook";
import { useGetUserByEmailQuery } from "../../redux/features/users/userApi";
import { IBook } from "../../types/globalTypes";

const ReadingList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: currentUserData } = useGetUserByEmailQuery(user.email!);
  console.log(currentUserData);
  const data = currentUserData?.data?.currentlyReading || undefined;
  return <div>
  <div className=" mx-auto md:px-[100px] my-20 pt-10 text-green-500">
    <h1 className="text-center text-3xl font-bold pb-2">My ReadingList</h1>
    <div>
      <div className="hidden w-11/12 mx-auto  md:flex justify-center items-center border p-2 mb-1  mt-10 rounded-md">
        <h5 className="font-bold w-2/12">Title</h5>
        <h5 className="font-bold w-2/12">Author</h5>
        <h5 className="font-bold w-2/12">Genre</h5>
        <h5 className="font-bold w-2/12">Publish</h5>
        <h5 className="font-bold w-2/12 ">Image</h5>
      </div>
      {data?.map((book: IBook) => (
        <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-center items-center border rounded-md mb-1 ">
          <p className="text-2xl text-center md:text-start font-semibold md:font-normal md:text-base md:w-2/12 ">
            {book?.title}
          </p>
          <p className=" text-xl md:text-base  md:w-2/12 ">
            {book?.author}
          </p>
          <p className="text-lg md:text-base md:w-2/12 ">{book?.genre}</p>
          <p className="text-lg md:text-base md:w-2/12">
            {book?.publication_date}
          </p>
          <div className="md:w-2/12 ">
            {" "}
            <img
              src={book?.image}
              alt=""
              className="w-[300px] md:w-20 md:my-1"
            />
          </div>
        </div>
      ))}
    </div>{" "}
  </div>
</div>;
};

export default ReadingList;
