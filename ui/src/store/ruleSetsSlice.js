import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// IMPORTANT: Change this to 9010 when you have it working in your API.
// For me, I implement this using the mocks
const port = 9010;

export const rulesetsApi = createApi({
  reducerPath: 'rulesetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${port}/`,
  }),

  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['RuleSet'],
  endpoints: (builder) => ({
    getRuleSets: builder.query({ query: () => `/rulesets` }),
    getRuleSetById: builder.query({ query: (id) => `/rulesets/${id}` }), // New query endpoint
  }),
});
// Question: how does this function get named?
export const { useGetRuleSetsQuery, useGetRuleSetByIdQuery } = rulesetsApi;
