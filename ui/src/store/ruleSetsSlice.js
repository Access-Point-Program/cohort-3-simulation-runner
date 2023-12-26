import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO - make this no longer call the mocks

export const rulesetsApi = createApi({
  reducerPath: 'rulesetsApi',
  //baseQuery: fetchBaseQuery({ baseUrl: `/` }),
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9004/` }),

  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['RuleSet'],
  endpoints: (builder) => ({
    getRuleSets: builder.query({ query: () => `/ruleset` }),
    getRuleSetById: builder.query({ query: (id) => `/ruleset/${id}` }), // New query endpoint
  }),
});
// Question: how does this function get named?
export const { useGetRuleSetsQuery, useGetRuleSetByIdQuery } = rulesetsApi;
