import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const elementsApi = createApi({
  reducerPath: 'elementsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (build) => ({
    getElements: build.query({
      query: () => '',
    }),
    getElementByNumber: build.query({
      query: (number) => `elements-list/${number}`,
    }),
    getEquation: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetElementsQuery,
  useLazyGetElementByNumberQuery,
  useGetEquationMutation,
} = elementsApi
