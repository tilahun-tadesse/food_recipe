// apollo.js

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { provide } from 'vue';
export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: 'https://popular-tadpole-24.hasura.app/v1/graphql'
  });

  // const authLink = setContext((_, { headers }) => {
  //   // Add authentication headers if needed
  //   return {
  //     headers: {
  //       ...headers,
  //       // Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   };
  // });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });
export const provideApolloClient = (apolloClient) => {
  provide(DefaultApolloClient, apolloClient);
};
  return apolloClient;
};
