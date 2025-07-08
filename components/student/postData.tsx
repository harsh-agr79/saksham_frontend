export interface Post {
  id: string;
  communityId: string; // Link posts to specific communities
  userId: string;
  username?: string;
  caption: string;
  content?: string; // Contains image URL or additional content
  reactions: { [key: string]: number }; // e.g., { like: 10 }
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  reactions: { [key: string]: number };
  replies: Comment[];
  createdAt: Date;
}

export const dummyPosts: Post[] = [
  {
    id: "1",
    communityId: "1",
    userId: "user1",
    username: "Alice",
    caption: "Exploring the beauty of nature 🌿",
    content: "https://example.com/nature.jpg",
    reactions: { like: 10, love: 5 },
    comments: [
      {
        id: "101",
        userId: "user2",
        username: "Bob",
        content: "Wow, that's beautiful!",
        reactions: { like: 3 },
        replies: [],
        createdAt: new Date("2023-11-25T09:00:00Z"),
      },
    ],
    createdAt: new Date("2023-11-25T08:00:00Z"),
  },
  {
    id: "2",
    communityId: "2",
    userId: "user2",
    username: "Bob",
    caption: "Achieved a new personal best in deadlifts!",
    content: "https://example.com/fitness.jpg",
    reactions: { like: 20, clap: 5 },
    comments: [],
    createdAt: new Date("2023-11-24T12:00:00Z"),
  },
  {
    id: "3",
    communityId: "3",
    userId: "user3",
    username: "Charlie",
    caption: "Check out my latest artwork! 🎨",
    content: "https://example.com/art.jpg",
    reactions: { like: 15, love: 8 },
    comments: [],
    createdAt: new Date("2023-11-23T10:00:00Z"),
  },
  {
    id: "4",
    communityId: "4",
    userId: "user4",
    username: "Daisy",
    caption: "Launching our new startup product next week 🚀",
    content: "https://example.com/startup.jpg",
    reactions: { like: 50, clap: 30 },
    comments: [],
    createdAt: new Date("2023-11-22T15:00:00Z"),
  },
];
