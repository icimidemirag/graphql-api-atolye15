"use strict";
import { ApolloServer } from "apollo-server";
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 3000;

server.listen({port}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  }
);
