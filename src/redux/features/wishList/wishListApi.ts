import { api } from "../../api/apiSlice";

const wishListApi = api.injectEndpoints({
    endpoints: (builder) => ({
  
      // feature
      addWishList: builder.mutation({
        query: (data) => ({
          url: "/addWishlist",
          method: "POST",
          body: data,
        }),
      }),
      getWishList: builder.query({
        query: (id) => `/wishList/${id}`,
      }),
      removeFromWishlist: builder.mutation({
        query: (id) => ({
          url: `/wishlist/${id}`,
          method: 'DELETE',
        })
      }),
    }),
  });
  
  export const {useGetWishListQuery,useAddWishListMutation,useRemoveFromWishlistMutation} = wishListApi;