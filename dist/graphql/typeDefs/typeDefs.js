import { gql } from 'apollo-server';
module.exports = gql `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Reaction {
    id: ID!
    content: String!
  }

  type Comment {
    id: ID!
    content: String!
    date: String!
    reactions: [Reaction]
    comments: [Comment]
  }

  type Post {
    id: ID!
    content: String!
    date: String!
    reactions: [Reaction]
    comments: [Comment]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    comments : [Comment]
    posts : [Post]
  }
`;
