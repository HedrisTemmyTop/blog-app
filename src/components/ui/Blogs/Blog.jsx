import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";

import "../../../styles/spinnerBody.css";

import {
  useDispatch,
  useSelector,
  useParams,
  publishBlog,
  deleteBlog,
  Tags,
  BlogHeading,
  GET_BLOG,
  Spinner,
  BlogContent,
  classes,
} from "./";
const Blog = () => {
  const token = localStorage.getItem("token"); // Getting token
  const userId = localStorage.getItem("userId"); // Current user id

  const { darkTheme } = useContext(ThemeContext);

  let { id } = useParams(); // Getting the id from the route

  const [isLoading, setIsLoading] = useState(false); // publishing state

  const dispatch = useDispatch();

  const { blog } = useSelector((state) => state.blogs); // destructuring the blogs
  const { loading, error, blogs } = useSelector((state) => state); // getting the loading, error and blog state
  useEffect(() => {
    dispatch(GET_BLOG(id)); // fetching the blog
  }, []);
  useEffect(() => {
    // // there's blog, the user owns it and its publised
    // if (
    //   blogs.blog &&
    //   blogs.blog.owner._id === localStorage.getItem("userId") &&
    //   blogs.blog.state === "published"
    // )
    //   setShouldDelete(true);
  }, [blogs]);
  const publishBlogHandler = async () => {
    const updatedData = {
      state: "published",
    };
    const route = "blogs/state/";
    const data = await publishBlog(setIsLoading, id, token, route, updatedData);
    return data;
  };
  const deleteBlogHandler = async () => {
    const data = await deleteBlog(id, token);
    console.log(data);
  };

  let content = null;
  if (loading) {
    content = (
      <div className="spinner_body">
        <Spinner />
      </div>
    );
  }

  if (!loading && blogs.blog && !error) {
    content = (
      <div className={classes.Blog}>
        <div className={classes.Tag}>
          {blog.tags.map((tag, index) => (
            <Tags tag={tag} index={index} />
          ))}
        </div>
        <div className={classes.BlogContent}>
          <BlogHeading
            title={blog.title}
            state={blog.state}
            isLoading={isLoading}
            publishHandler={publishBlogHandler}
            deleteHandler={deleteBlogHandler}
            owner={blog.owner}
            userId={userId}
            darkTheme={darkTheme}
          />
          <BlogContent
            owner={blog.owner}
            createdAt={blog.createdAt}
            readingTime={blog.reading_time}
            body={blog.body}
            state={blog.state}
            loading={isLoading}
            publishBlogHandler={publishBlogHandler}
            deleteBlogHandler={deleteBlogHandler}
            userId={userId}
            darkTheme={darkTheme}
          />
        </div>
      </div>
    );
  }

  if (error) content = <div>An error occured</div>;
  return content;
};

export default Blog;
