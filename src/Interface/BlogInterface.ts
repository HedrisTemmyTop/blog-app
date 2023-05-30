import { DataTypes, UserTypes } from "./ProfileInterface";

export interface commentInterface {
  _id: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
    profileImage?: string;
  };
  content: string;
}

export interface Heading {
  title: string;
  state: string;
  isLoading: boolean;
  deleteHandler: () => void;
  publishHandler: () => void;
  owner: {
    profileImage: string | null;
    username: string;
    _id: string;
  };
  userId: string;
  darkTheme: boolean;
  isDeleting: boolean;
}

export interface ContentInterface {
  owner: {
    profileImage: string | null;
    username: string;
    _id: string;
  };
  createdAt: string;
  readingTime: number;
  body: string;
  state: string;
  loading: boolean;
  publishBlogHandler: () => void;
  deleteBlogHandler: () => void;
  userId: string;
  darkTheme: boolean;
  coverImage: string;
  isDeleting: boolean;
  postId: string;
  comment: commentInterface[];
  views: number;
  likes: LikeInterface[];
  bookmarked: boolean;
}

export interface PostBlogInterface {
  mssg: {
    data: {
      blog: {
        _id: string;
      };
    };
  };
  loading: boolean;
  error: string;
  success: boolean;
}

interface StateTypes {
  post_blog: PostBlogInterface;
  blogs: {
    blog: UserTypes;
    loading: boolean;
    error: string;
    comment: [];
  };

  loading: boolean;
  error: string;
}

export interface LikeInterface {
  createdAt: string;
  post: string;
  user: {
    profileImage: string;
    username: string;
    _id: string;
  };
  _id: string;
}

export interface BlogInterface {
  blogs: {
    blog: {
      post: DataTypes;
      comments: commentInterface[];
      likes: LikeInterface[];
    };
    loading: boolean;
    error: string;
  };
}

export default StateTypes;
