import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rulesetsApi = createApi({
  reducerPath: 'rulesetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/`,
  }),

  // Tags are important for caching to prevent additional API calls.
  tagTypes: ['RuleSet'],
  endpoints: (builder) => ({
    getRuleSets: builder.query({ query: () => `/ruleset` }),
    getRuleSetById: builder.query({ query: (id) => `/ruleset/${id}` }), // New query endpoint
  }),
});
// Question: how does this function get named?
export const { useGetRuleSetsQuery, useGetRuleSetByIdQuery } = rulesetsApi;
