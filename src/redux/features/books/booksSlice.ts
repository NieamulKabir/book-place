import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface IBook{
    searchText: string;
    genre:string;
    publicationDate:string
}
const initialState:IBook={
    searchText:'',
    genre:'',
    publicationDate:''
}
const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      setSearchText: (state, action: PayloadAction<string>) => {
        state.searchText = action.payload;
      },
      setGenre: (state, action: PayloadAction<string>) => {
        state.genre = action.payload;
      },
      setPublicationDate: (state, action: PayloadAction<string>) => {
        state.publicationDate = action.payload;
      },
    },
  });
  
  export const { setSearchText, setGenre, setPublicationDate } = bookSlice.actions;
  
  export default bookSlice.reducer;