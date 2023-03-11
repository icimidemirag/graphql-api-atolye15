const typeDefs = `#graphql

type Reaction {
  id: ID!
  postId: ID!
  reactionType: String!
  reactionCount: Int!
}

type Comment {
  id: ID!
  parentId: ID!
  content: String!
  createdDate: String
  reactions: [Reaction]
  comments: [Comment]
}

type Post {
  id: ID!
  content: String!
  createdDate: String
  reactions: [Reaction]
  comments: [Comment]
}

type Query {
  getComments(parentId: ID!) : [Comment]
  getPosts : [Post]
  getPost(postId: ID!) : Post
}

type Mutation {
  addPost(content: String!): Post!
  addCommentToComment(parentId: ID!, content: String!): Comment!
  addCommentToPost(parentId: ID!, content: String!): Comment!
  addReactionToComment(postId: ID!, reactionType: String!): Reaction!
  addReactionToPost(postId: ID!, reactionType: String!): Reaction!
}
`;

export default typeDefs;