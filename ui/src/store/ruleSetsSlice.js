import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const port = 8080;

export const rulesetsApi = createApi({
  reducerPath: 'rulesetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${port}/`,
  }),
  tagTypes: ['RuleSet'],
  endpoints: (builder) => ({
    getRuleSets: builder.query({ query: () => `/rulesets` }),
    getRuleSetById: builder.query({ query: (id) => `/rulesets/${id}` }), // New query endpoint
  }),
});

export const { useGetRuleSetsQuery, useGetRuleSetByIdQuery } = rulesetsApi;
