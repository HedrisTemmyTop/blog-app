import HandleInterface from "./HandleInterface";

export interface DataTypes {
  image: string[];
  tags: string[];

  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  _id: string;
  state: string;
  reading_time: number;
  owner: {
    profileImage: string | null;
    username: string;
    _id: string;
  };
}

export interface UserData {
  username: string;
  lastname: string;
  socialHandle: HandleInterface[];
  _id: string;
  profileImage?: string;
  firstname: string;
  job: { company: string; role: string }[];
  bio: string;
  email: string;
  location: string;
}
export interface UserTypes {
  user: UserData;
  posts: DataTypes[];
  post: DataTypes;
}

interface errorTypes {
  response?: {
    data?: string;
  };
}

interface User {
  user: UserTypes;
  error: errorTypes;
  loading: boolean;
}
export interface UserProfileTypes {
  user_profile: User;
  visiting_profile: User;
}

export interface BioInterface {
  username: string;
  job: { company: string; role: string }[];
  userImage: string;
  bio: string;
  socialHandles: HandleInterface[];
}
