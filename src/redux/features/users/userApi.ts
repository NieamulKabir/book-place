import { IBook, IResponse, IUser } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";
export interface IUpdateUser {
  id: string | undefined;
  data: Partial<IUser> | Partial<IBook> | undefined;
}

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
    updateUser:builder.mutation<object,IUpdateUser>({
      query:({id,data})=>({
        url:`/user/${id}`,
        method:"PATCH",
        body:data
      })
    })
  }),
});

export const { useCreateNewUserMutation ,useGetUserQuery,useGetUserByEmailQuery} = userApi;
