import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import bookReducer from "./features/books/booksSlice";
import userReducer from "./features/users/userSlice";
import wishListReducer from "./features/wishList/wishListSlice";
import searchReducer from "./features/search/searchSlice";
const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    wishList: wishListReducer,
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
