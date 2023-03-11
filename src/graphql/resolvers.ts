"use strict";
import { GraphQLError } from "graphql";
import comments from '../data/comments';
import posts from '../data/posts';
import reactions from '../data/reactions';
import { Comment, Post, Reaction } from "./types";

const resolvers = {
  Query: {
    getComments: (_:null, x: {parentId: string}) => {
      return comments.filter((comment) => comment.parentId === x.parentId);
    },
    getPosts: () => posts,
    getPost: (_:null, x: {postId: string}) => {
      return posts.find((post) => post.id === x.postId);
    },
  },
  Mutation: {
    addPost: (_:null, x: {content: string}) => {
      try {
        if (x.content.length > 280)
          throw new Error(
            "You cannot send a post which has more than 280 characters"
          );
        const now = new Date();
        const post = {
          id: (posts.length + 1).toLocaleString() + "p",
          content: x.content,
          createdDate: now.toLocaleString(),
          reactions: [],
          comments: [],
        };
        posts.push(post);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
    addCommentToComment: (_:null, x: { parentId: string, content: string}) => {
      try {
        if (x.content.length > 280)
          throw new Error(
            "You cannot send a post which has more than 280 characters"
          );
        const now = new Date();
        const comment: Comment = {
          parentId: x.parentId,
          id: (comments.length + 1).toLocaleString() + "c",
          content: x.content,
          createdDate: now.toLocaleString(),
          reactions: [],
          comments: [],
        };
        comments.forEach((comment:Comment) => {
          if (comment.id === x.parentId) {
            comment.comments.push(comment);
          }
        });
        comments.push(comment);
        return comment;
      } catch (error) {
        console.log(error);
      }
    },
    addCommentToPost: (_:null, x: { parentId: string, content: string }) => {
      try {
        if (x.content.length > 280)
          throw new GraphQLError('You cannot send a reaction which is not in the list', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          });
        const now = new Date();
        const comment = {
          parentId: x.parentId,
          id: (comments.length + 1).toLocaleString() + "c",
          content: x.content,
          createdDate: now.toLocaleString(),
          reactions: [],
          comments: [],
        };
        posts.forEach((post) => {
          if (post.id === x.parentId) {
            post.comments.push(comment);
          }
        });
        comments.push(comment);
        return comment;
      } catch (error) {
        console.log(error);
      }
    },
    addReactionToComment: (_:null, x: { postId: string, reactionType: string }) => {
      try {
        if (!reactions.includes(x.reactionType))
          throw new GraphQLError('You cannot send a reaction which is not in the list', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          });     
        const reaction = {
          id: x.postId + "r",
          postId: x.postId,
          reactionType: x.reactionType,
          reactionCount: 1,
        };
        let flag = false;
        comments.forEach((comment:Comment) => {
          if (comment.id === x.postId) {
            comment.reactions.forEach((commentReaction) => {
              if (commentReaction.reactionType === x.reactionType) {
                commentReaction.reactionCount += 1;
                flag = true;
                reaction.reactionCount = commentReaction.reactionCount;
              }
            });
            if (!flag) comment.reactions.push(reaction);
          }
        });
        return reaction;
      } catch (error) {
        console.log(error);
      }
    },
    addReactionToPost: (_:any, x: { postId: string, reactionType: string }) => {
      try {
        if (!reactions.includes(x.reactionType))
          throw new Error("You cannot send a reaction which is not in the list");
        const reaction = {
          id: x.postId + "r",
          postId: x.postId,
          reactionType: x.reactionType,
          reactionCount: 1,
        };
        let flag = false;
        posts.forEach((post:Post) => {
          if (post.id === x.postId) {
            post.reactions.forEach((postReaction) => {
              if (postReaction.reactionType === x.reactionType) {
                postReaction.reactionCount += 1;
                flag = true;
                reaction.reactionCount = postReaction.reactionCount;
              }
            });
            if (!flag) post.reactions.push(reaction);
          }
        });
        return reaction;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;