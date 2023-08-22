
import { api } from "../../api/apiSlice";


const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags:['postBook','updateBook','deleteBook']
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags:['updateBook','deleteBook']
    }),

    postBook: builder.mutation({
      query: (data) => ({
        url: "/addBook",
        method: "POST",
        body: data,
      }),
   invalidatesTags:['postBook']
    }),
    
    updateBook:builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id!}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:['updateBook']
      
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['deleteBook']
    }),
   
  }),
});

export const { useGetBooksQuery, useSingleBookQuery,usePostBookMutation,useUpdateBookMutation,useDeleteBookMutation } = bookApi;
