import { IUser } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<object, IUser>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getUserByEmail: builder.query<IResponse<IUser>, string>({
      query: (email) => `/user/${email}`,
    }),
  }),
});

export const { useCreateNewUserMutation ,useGetUserQuery,useGetUserByEmailQuery} = userApi;
