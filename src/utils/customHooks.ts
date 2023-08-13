import { IBook } from "../types/globalTypes";

export const isValidUrl = (url: string) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
};

export const updateWishList = (
  userEmail: string | null,
  book: IBook,
  userWishList: IBook[] | undefined,
  updateUser: (arg0: {
    id: string | undefined;
    data: { wishList: IBook[] | undefined } | { wishList: IBook[] };
  }) => Promise<any>,
  userId: string | undefined,
  navigate: (route: string) => void
) => {
  if (userEmail) {
    const isExist = userWishList?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromWishList = userWishList?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        wishlist: removeFromWishList,
      };
      updateUser({ id: userId, data })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = userWishList
        ? { wishList: [...userWishList, book] }
        : { wisshList: [book] };
      updateUser({ id: userId, data })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    navigate("/signin");
  }
};
