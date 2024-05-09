
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const fakeApi = createApi({
  reducerPath: 'fakeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products' }),
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (productId) => `/${productId}`,
    }),
    getCategories: builder.query({
        query: () => `categories`,
      }),
      getProductBycategory: builder.query({
        query: (catName) => `category/${catName}`,
      }),
  }),
})

export const { useGetProductByIdQuery, useGetCategoriesQuery, useGetProductBycategoryQuery  } = fakeApi