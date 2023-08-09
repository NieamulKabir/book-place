import { IAllResponse, IBook, IResponse } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

export interface IEditBook {
  bookId: string | undefined;
  data: Partial<IBook> | undefined;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IAllResponse<IBook>, void>({
      query: () => "/books",
    }),
    singleBook: builder.query<IResponse<IBook>, string>({
      query: (id) => `/book/${id}`,
    }),

    postBook: builder.mutation<object, IBook>({
      query: (data) => ({
        url: "/addBook",
        method: "POST",
        body: data,
      }),
    }),
    
    updateBook:builder.mutation<object, IEditBook>({
      query: ({ bookId, data }) => ({
        url: `/book/${bookId!}`,
        method: "PATCH",
        body: data,
      })
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      
    }),
   
  }),
});

export const { useGetBooksQuery, useSingleBookQuery,usePostBookMutation,useUpdateBookMutation,useDeleteBookMutation } = bookApi;
