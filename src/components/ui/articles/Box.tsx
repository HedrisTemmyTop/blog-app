import React, { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import HomepageBlog from "./BlogTypes/HomePageBlogs";
import ProfileBlogs from "./BlogTypes/ProfileBlogs";
import { DataTypes } from "../../../Interface/ProfileInterface";

interface PropTypes {
  data: DataTypes;
  username: string;
  profileImage: string | null;
  userId?: string;
  viewerId?: string;
  button?: boolean;
}

const Box = (props: PropTypes) => {
  const { data, button, username, profileImage, userId, viewerId } = props;
  const { darkTheme } = useContext(ThemeContext);
  return !button || userId !== viewerId ? (
    <HomepageBlog
      data={
        button
          ? { ...data, owner: { username, profileImage, _id: data._id } }
          : data
      }
      darkTheme={darkTheme}
    />
  ) : (
    <ProfileBlogs
      data={data}
      darkTheme={darkTheme}
      username={username}
      profileImage={profileImage}
    />
  );
};

export default Box;
