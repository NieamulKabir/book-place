/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from "../types/globalTypes";

export const isValidUrl = (url: string) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(url);
};

// export const updateWishList = (
//   userEmail: string | null,
//   book: IBook,
//   userWishList: IBook[] | undefined,
//   updateUser: (arg0: {
//     id: string | undefined;
//     data: { wishList: IBook[] | undefined } | { wishList: IBook[] };
//   }) => Promise<any>,
//   userId: string | undefined,
//   navigate: (route: string) => void
// ) => {
//   if (userEmail) {
//     const isExist = userWishList?.find((list) => list._id === book._id);
//     if (isExist) {
//       const removeFromWishList = userWishList?.filter(
//         (list) => list._id !== book._id
//       );
//       const data = {
//         wishList: removeFromWishList,
//       };
//       updateUser({ id: userId, data })
//         .then(() => {})
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       const data = userWishList
//         ? { wishList: [...userWishList, book] }
//         : { wishList: [book] };
//       updateUser({ id: userId, data })
//         .then(() => {})
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   } else {
//     navigate("/signin");
//   }
// };

export const updateWishlist = (
  userEmail: string | null,
  book: IBook,
  userWishlist: IBook[] | undefined,
  updateUser: (arg0: {
    id: string | undefined;
    data: { wishlist: IBook[] | undefined } | { wishlist: IBook[] };
  }) => Promise<any>,

) => {
  if (userEmail) {
    const isExist = userWishlist?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromWishlist = userWishlist?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        wishlist: removeFromWishlist,
      };
      updateUser({ id: userEmail, data })
        .then(() => {
          //   console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = userWishlist
        ? {
            wishlist: [...userWishlist, book],
          }
        : {
            wishlist: [book],
          };
      updateUser({ id: userEmail, data })
        .then(() => {
          //   console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};

export const updateCompletedBooks = (
  userEmail: string | null,
  book: IBook,
  completedBooks: IBook[] | undefined,
  updateUser: (arg0: {
    id: string | undefined;
    data: { completedBooks: IBook[] | undefined } | { completedBooks: IBook[] };
  }) => Promise<any>,
  userId: string | undefined,
  navigate: (route: string) => void
) => {
  if (userEmail) {
    const isExist = completedBooks?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromCompleted = completedBooks?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        completedBooks: removeFromCompleted,
      };
      updateUser({ id: userId, data })
        .then(() => {
          //   console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = completedBooks
        ? {
            completedBooks: [...completedBooks, book],
          }
        : {
            completedBooks: [book],
          };
      updateUser({ id: userId, data })
        .then(() => {
          //   console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    navigate("/signin");
  }
};