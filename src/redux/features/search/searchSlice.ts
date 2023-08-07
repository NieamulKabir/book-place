import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface IBookFilter {
  keyword: string;
  genre: string;
  published_year: string;
}

const initialState: IBookFilter = {
  keyword: "",
  genre: "",
  published_year: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    selectedGenre: (state, action) => {
      state.genre = action.payload;
    },
    selectedYear: (state, action) => {
      state.published_year = action.payload;
    },
    clearFilter: (state) => {
      state.keyword = "";
      state.genre = "";
      state.published_year = "";
    },
  },
});

export const { search, selectedGenre, selectedYear, clearFilter } =
  searchSlice.actions;
export default searchSlice.reducer;
