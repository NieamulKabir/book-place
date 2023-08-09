import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

interface IUserState {
  user: {
    id: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface ICredential {
  email: string;
  password: string;
}
const initialState: IUserState = {
  user: {
    id: null,
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.user.id = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user.email = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    },
    errorHandle: (state) => {
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading, logout, errorHandle, setUserId } =
  userSlice.actions;
export default userSlice.reducer;
