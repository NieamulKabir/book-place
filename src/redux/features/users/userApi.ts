import { IResponse, IUser } from "../../../types/globalTypes";
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
    getUser: builder.query<IResponse<IUser>, string>({
      query: (id) => `/user/${id}`,
    }),
    getUserByEmail: builder.query<IResponse<IUser>, string>({
      query: (email) => `/user/${email}`,
    }),
  }),
});

export const { useCreateNewUserMutation ,useGetUserQuery,useGetUserByEmailQuery} = userApi;
