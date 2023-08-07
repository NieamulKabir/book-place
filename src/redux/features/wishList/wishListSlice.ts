import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IWishListState {
  total: number;
  books: IBook[];
}

const initialState: IWishListState = {
  total: 0,
  books: [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<IBook>) => {
      const exist = state.books.find((book) => book._id === action.payload._id);

      if (!exist) {
        state.books.push(action.payload);
        state.total = state.total + 1;
      }
    },
    removeFromWishList: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
      state.total = state.total - 1;
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
