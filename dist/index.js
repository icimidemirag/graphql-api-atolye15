"use strict";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql

  type Reaction {
    id: ID!
    ownerId: ID!
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
    getComments(commentId: ID!) : [Comment]
    getPosts : [Post]
    getPost(postId: ID!) : Post
  }

  type Mutation {
    addPost(content: String!): Post!
    addCommentToComment(parentId: ID!, content: String!): Comment!
    addCommentToPost(parentId: ID!, content: String!): Comment!
    addReactionToComment(ownerId: ID!, reactionType: String!): Reaction!
    addReactionToPost(ownerId: ID!, reactionType: String!): Reaction!
  }
`;
const posts = [
    {
        id: "1p",
        content: "Hello World Post 1",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [{
                id: "1c",
                parentId: "1p",
                content: "Hello World Comment 1",
                createdDate: "2021-01-01",
                reactions: [],
                comments: [],
            }],
    },
    {
        id: "2p",
        content: "Hello World Post 2",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [{
                id: "2c",
                parentId: "2p",
                content: "Hello World Comment 2",
                createdDate: "2021-01-01",
                reactions: [],
                comments: [],
            }],
    },
];
const comments = [
    {
        id: "1c",
        parentId: "1p",
        content: "Hello World Comment 1",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [],
    },
    {
        id: "2c",
        parentId: "2p",
        content: "Hello World Comment 2",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [],
    },
];
const reactions = [
    "Thumbs Up", "Thumbs Down", "Rocket", "Heart"
];
const resolvers = {
    Query: {
        getComments: (_, { parentId }) => {
            return comments.filter((comment) => comment.parentId === parentId);
        },
        getPosts: () => posts,
        getPost: (_, { postId }) => {
            return posts.find((post) => post.id === postId);
        },
    },
    Mutation: {
        addPost: (_, { content }) => {
            try {
                if (content.length > 280)
                    throw new Error("You cannot send a post which has more than 280 characters");
                const now = new Date();
                const post = {
                    id: (posts.length + 1).toLocaleString() + "p",
                    content: content,
                    createdDate: now.toLocaleString(),
                    reactions: [],
                    comments: [],
                };
                posts.push(post);
                return post;
            }
            catch (error) {
                console.log(error);
            }
        },
        addCommentToComment: (_, { parentId, content }) => {
            try {
                if (content.length > 280)
                    throw new Error("You cannot send a post which has more than 280 characters");
                const now = new Date();
                const comment = {
                    parentId: parentId,
                    id: (comments.length + 1).toLocaleString() + "c",
                    content: content,
                    createdDate: now.toLocaleString(),
                    reactions: [],
                    comments: [],
                };
                comments.forEach((comment) => {
                    if (comment.id === parentId) {
                        comment.comments.push(comment);
                    }
                });
                comments.push(comment);
                return comment;
            }
            catch (error) {
                console.log(error);
            }
        },
        addCommentToPost: (_, { parentId, content }) => {
            try {
                if (content.length > 280)
                    throw new Error("You cannot send a post which has more than 280 characters");
                const now = new Date();
                const comment = {
                    parentId: parentId,
                    id: (comments.length + 1).toLocaleString() + "c",
                    content: content,
                    createdDate: now.toLocaleString(),
                    reactions: [],
                    comments: [],
                };
                posts.forEach((post) => {
                    if (post.id === parentId) {
                        post.comments.push(comment);
                    }
                });
                comments.push(comment);
                return comment;
            }
            catch (error) {
                console.log(error);
            }
        },
        addReactionToComment: (_, { ownerId, reactionType }) => {
            try {
                if (!reactions.includes(reactionType))
                    throw new Error("You cannot send a reaction which is not in the list");
                const reaction = {
                    id: ownerId + "r",
                    ownerId: ownerId,
                    reactionType: reactionType,
                    reactionCount: 1,
                };
                let flag = false;
                comments.forEach((comment) => {
                    if (comment.id === ownerId) {
                        comment.reactions.forEach((commentReaction) => {
                            if (commentReaction.reactionType === reactionType) {
                                commentReaction.reactionCount += 1;
                                flag = true;
                                reaction.reactionCount = commentReaction.reactionCount;
                            }
                        });
                        if (!flag)
                            comment.reactions.push(reaction);
                    }
                });
                return reaction;
            }
            catch (error) {
                console.log(error);
            }
        },
        addReactionToPost: (_, { ownerId, reactionType }) => {
            try {
                if (!reactions.includes(reactionType))
                    throw new Error("You cannot send a reaction which is not in the list");
                const reaction = {
                    id: ownerId + "r",
                    ownerId: ownerId,
                    reactionType: reactionType,
                    reactionCount: 1,
                };
                let flag = false;
                posts.forEach((post) => {
                    if (post.id === ownerId) {
                        post.reactions.forEach((postReaction) => {
                            if (postReaction.reactionType === reactionType) {
                                postReaction.reactionCount += 1;
                                flag = true;
                                reaction.reactionCount = postReaction.reactionCount;
                            }
                        });
                        if (!flag)
                            post.reactions.push(reaction);
                    }
                });
                return reaction;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
