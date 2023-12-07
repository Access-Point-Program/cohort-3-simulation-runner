import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// IMPORTANT: Change this to 9010 when you have it working in your API.
// For me, I implement this using the mocks
const port = 9003; 

// The example is using the Pokemon API
// https://redux-toolkit.js.org/tutorials/rtk-query
export const layoutsApi = createApi({
    reducerPath: 'layoutsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:${port}/`,
    }),

    
  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['Layout'],
  endpoints: (builder) => ({
    getLayouts: builder.query({ query: () => `/layouts` }),
  }),
})

// Question: how does this function get named?
export const { useGetLayOutsQuery } = layoutsApi