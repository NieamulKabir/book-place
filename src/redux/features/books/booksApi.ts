import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),

    postBook: builder.mutation({
      query: (data) => ({
        url: "/addBook",
        method: "POST",
        body: data,
      }),
    }),
    
    updateBook:builder.mutation({
      query:({data,id})=>({
        url:`/book/${id}`,
        method:"PATCH",
        body:data
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
