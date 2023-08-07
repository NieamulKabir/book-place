import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import userReducer from "./features/users/userSlice"
import wishListReducer from "./features/wishList/wishListSlice"
import searchReducer from "./features/search/searchSlice"
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user:userReducer,
    wishList:wishListReducer,
    search:searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;