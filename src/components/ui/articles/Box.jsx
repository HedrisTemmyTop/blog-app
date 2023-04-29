import React, { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import HomepageBlog from "./BlogTypes/HomePageBlogs";
import ProfileBlogs from "./BlogTypes/ProfileBlogs";

const Box = ({ data, button, username }) => {
  const { darkTheme } = useContext(ThemeContext);
  return !button ? (
    <HomepageBlog data={data} darkTheme={darkTheme} />
  ) : (
    <ProfileBlogs data={data} darkTheme={darkTheme} username={username} />
  );
};

export default Box;
