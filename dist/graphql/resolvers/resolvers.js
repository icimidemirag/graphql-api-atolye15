import { GraphQLError } from "graphql";
const comments = require('../../data/comments.ts');
const posts = require('../../data/posts.ts');
const reactions = require('../../data/reactions.ts');
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
                    throw new GraphQLError('You cannot send a reaction which is not in the list', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        }
                    });
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
        addReactionToComment: (_, { postId, reactionType }) => {
            try {
                if (!reactions.includes(reactionType))
                    throw new GraphQLError('You cannot send a reaction which is not in the list', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        }
                    });
                const reaction = {
                    id: postId + "r",
                    postId: postId,
                    reactionType: reactionType,
                    reactionCount: 1,
                };
                let flag = false;
                comments.forEach((comment) => {
                    if (comment.id === postId) {
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
        addReactionToPost: (_, { postId, reactionType }) => {
            try {
                if (!reactions.includes(reactionType))
                    throw new Error("You cannot send a reaction which is not in the list");
                const reaction = {
                    id: postId + "r",
                    postId: postId,
                    reactionType: reactionType,
                    reactionCount: 1,
                };
                let flag = false;
                posts.forEach((post) => {
                    if (post.id === postId) {
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
export default resolvers;
