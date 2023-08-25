/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-hot-toast";
import { IBook } from "../types/globalTypes";

// export const isValidUrl = (url: string) => {
//   const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
//   return pattern.test(url);
// };

export const updateWishlist = (
  userEmail: string | null,
  book: IBook,
  userWishlist: IBook[] | undefined,
  updateUser: (arg0: {
    id: string | undefined;
    data: { wishlist: IBook[] | undefined } | { wishlist: IBook[] };
  }) => Promise<any>,
  userId: string | undefined,
  navigate: (route: string) => void
) => {
  if (userEmail) {
    const isExist = userWishlist?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromWishlist = userWishlist?.filter(
        (list) => list?._id !== book?._id
      );
      const data = {
        wishlist: removeFromWishlist,
      };
      updateUser({ id: userId, data })
        .then(() => {
          toast.success("Remove Successfully")

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
      updateUser({ id: userId, data })
        .then(() => {
          toast.success("Add Successfully")
        })
        .catch((error) => {
          console.log(error);
          
        });
    }
  } else {
    navigate("/signUp");
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
    navigate("/signUp");
  }
};

export const updateCurrentlyReading = (
  userEmail: string | null,
  book: IBook,
  currentlyReading: IBook[] | undefined,
  updateUser: (arg0: {
    id: string | undefined;
    data:
      | { currentlyReading: IBook[] | undefined }
      | { currentlyReading: IBook[] };
  }) => Promise<any>,
  userId: string | undefined,
  navigate: (route: string) => void
) => {
  if (userEmail) {
    const isExist = currentlyReading?.find((list) => list._id === book._id);
    if (isExist) {
      const removeFromReading = currentlyReading?.filter(
        (list) => list._id !== book._id
      );
      const data = {
        currentlyReading: removeFromReading,
      };
      updateUser({ id: userId, data })
        .then(() => {
          //   console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const data = currentlyReading
        ? {
            currentlyReading: [...currentlyReading, book],
          }
        : {
            currentlyReading: [book],
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
    navigate("/signUp");
  }
};
