const posts = [
  {
    id: "1p",
    content: "Hello World Post 1",
    createdDate: "2021-01-01",
    reactions: [],
    comments: [
      {
        id: "1c",
        parentId: "1p",
        content: "Hello World Comment 1",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [],
      },
    ],
  },
  {
    id: "2p",
    content: "Hello World Post 2",
    createdDate: "2021-01-01",
    reactions: [],
    comments: [
      {
        id: "2c",
        parentId: "2p",
        content: "Hello World Comment 2",
        createdDate: "2021-01-01",
        reactions: [],
        comments: [],
      },
    ],
  },
];

export default posts;