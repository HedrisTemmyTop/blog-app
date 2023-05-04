import React, { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import HomepageBlog from "./BlogTypes/HomePageBlogs";
import ProfileBlogs from "./BlogTypes/ProfileBlogs";

const Box = ({ data, button, username, profileImage, userId, viewerId }) => {
  const { darkTheme } = useContext(ThemeContext);
  return !button || userId !== viewerId ? (
    <HomepageBlog
      data={button ? { ...data, owner: { username, profileImage } } : data}
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
