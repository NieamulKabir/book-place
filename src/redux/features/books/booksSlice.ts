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