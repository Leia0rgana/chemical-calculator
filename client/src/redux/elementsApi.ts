import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IElement } from '../types/data'

interface IRequest {
  equation: string
}

interface IResponse {
  outChem: string
  [key: string]: string
}

export const elementsApi = createApi({
  reducerPath: 'elementsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (build) => ({
    getElements: build.query<IElement[], void>({
      query: () => '',
    }),
    getElementByNumber: build.query<IElement, number>({
      query: (number) => `elements-list/${number}`,
    }),
    getEquation: build.mutation<IResponse, IRequest>({
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
