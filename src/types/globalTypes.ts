import { ReactNode } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export interface IProps {
  children: ReactNode;
}

export interface IReviews {
  _id?: string;
  user_id?: string;
  user_image?: string;
  rating?: number;
  comment: string;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  publication_date: string;
  image?: string;
  price?: number;
  rating?: number;
  createdBy: string;
  reviews?: IReviews[] | undefined
}
export interface ISingleBook {
  book: IBook;
  _id: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
}

export interface IUser {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  wishlist?: IBook[] | undefined;
  completedBooks?: IBook[] | undefined;
  currentlyReading?: IBook[] | undefined;
}

export interface IAllResponse<T> {
  status: boolean;
  data: T[] | undefined;
}
export interface IResponse<T> {
//   status: boolean;
  data: T | undefined;
}
export interface ICreateResponse {
  status: boolean;
  data: object;
}

export interface IError  {
  error: FetchBaseQueryError | SerializedError | undefined
}

// export interface IWishlist {
//   _id: string;
//   book?: ISingleBook;
//   user?: IUser;
// }
// export interface IReadingList {
//   _id: string;
//   book?: ISingleBook;
//   user?: IUser;
// }
// export interface ICompleteList {
//   _id: string;
//   book?: ISingleBook;
//   user?: IUser;
// }
// export interface IReview {
//   _id?: string;
//   reviewer?: string;
//   rating?: number;
//   comment?: string;
// }
