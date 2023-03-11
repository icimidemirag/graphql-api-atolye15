import { Comment, Reaction } from "../graphql/types";

const comments = [
  {
    id: "1c",
    parentId: "1p",
    content: "Hello World Comment 1",
    createdDate: "2021-01-01",
    reactions: [] as Array<Reaction>,
    comments: [] as Array<Comment>,
  },
  {
    id: "2c",
    parentId: "2p",
    content: "Hello World Comment 2",
    createdDate: "2021-01-01",
    reactions: [] as Array<Reaction>,
    comments: [] as Array<Comment>,
  },
];

export default comments;
