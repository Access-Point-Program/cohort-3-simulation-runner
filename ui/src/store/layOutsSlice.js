import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// The example is using the Pokemon API
// https://redux-toolkit.js.org/tutorials/rtk-query
export const layoutsApi = createApi({
  reducerPath: 'layoutsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/` }),
  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['Layout'],
  endpoints: (builder) => ({
    getLayouts: builder.query({ query: () => `/layouts` }),
  }),
})

// Question: how does this function get named?
export const { useGetLayoutsQuery } = layoutsApi