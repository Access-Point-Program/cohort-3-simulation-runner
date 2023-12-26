import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TODO - make this no longer call the mocks

// The example is using the Pokemon API
// https://redux-toolkit.js.org/tutorials/rtk-query
export const layoutsApi = createApi({
  reducerPath: 'layoutsApi',
  //baseQuery: fetchBaseQuery({ baseUrl: `/` }),
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9003/` }),
  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['Layout'],
  endpoints: (builder) => ({
    getLayouts: builder.query({ query: () => `/api/layouts/all` }),
    getLayoutByID: builder.query({ query: (id) => `/api/layouts/${id}` }),
  }),
})

// Question: how does this function get named?
export const { useGetLayoutsQuery } = layoutsApi