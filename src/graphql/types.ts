export interface Reaction {
  id: string;
  postId: string;
  reactionType: string;
  reactionCount: number;
}

export interface Comment {
  id: string;
  parentId: string;
  content: string;
  createdDate: string;
  reactions: Array < Reaction >;
  comments: Array < Comment >;
}

export interface Post {
  id: string;
  content: string;
  createdDate: string;
  reactions: Array < Reaction >;
  comments: Array < Comment >;
}