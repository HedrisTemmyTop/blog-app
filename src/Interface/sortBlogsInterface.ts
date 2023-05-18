import { DataTypes, UserData } from "./ProfileInterface";

export interface sortBlogs {
  darkTheme: boolean;
  sortedBlogs: DataTypes[];
  currentPage: number;
  userData: UserData;
  id: string;
  userId: string;
}
