import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import AlertMessage from "../../alertMessage/alertMessage";
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

  const [isPublishing, setIsPublishing] = useState(false); // publishing state
  const [isDeleting, setIsDeleting] = useState(null);
  const [isDeleted, setIsDeleted] = useState(null);
  const [isPublished, setIsPublished] = useState(null);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector((state) => state.blogs); // destructuring the blogs
  // const { loading, error, blogs } = useSelector((state) => state); // getting the loading, error and blog state
  useEffect(() => {
    dispatch(GET_BLOG(id)); // fetching the blog
  }, []);

  useEffect(() => {
    if (isDeleted || isPublished) {
      setTimeout(() => {
        window.history.back();
      }, 2600);
    }
  }, [isDeleted, isPublished]);
  // PUBLISHIN A BLOG
  const publishBlogHandler = async () => {
    const updatedData = {
      state: "published",
    };
    const route = "blogs/state/";
    setIsPublishing(true);
    const data = await publishBlog(id, token, route, updatedData);
    setIsPublishing(false);
    if (data.status === 200) {
      setMessage("You successfully published your blog 😎😍");
      setIsPublished(true);
    }
  };

  // DELETING A BLOG
  const deleteBlogHandler = async () => {
    setIsDeleting(true);
    const data = await deleteBlog(id, token);
    setIsDeleting(false);
    if (data.status === 200) {
      setMessage("You successfully deleted your blog 😪😫");
      setIsDeleted(true);
    }
  };

  let content = null;
  if (loading) {
    console.log("Hello world");
    content = (
      <div className="spinner_body">
        <Spinner />
      </div>
    );
  }

  if (!loading && blog && !error) {
    console.log(blog);
    content = (
      <div className={classes.Blog}>
        <div className={classes.Tag}>
          {blog.post.tags.map((tag, index) => (
            <Tags tag={tag} index={index} key={index} />
          ))}
        </div>
        <div className={classes.BlogContent}>
          {isDeleted || isPublished ? (
            <AlertMessage bgColor="success" message={message} duration={2500} />
          ) : null}
          <BlogHeading
            title={blog.post.title}
            state={blog.post.state}
            isLoading={isPublishing}
            publishHandler={publishBlogHandler}
            deleteHandler={deleteBlogHandler}
            owner={blog.post.owner}
            userId={userId}
            isDeleting={isDeleting}
            darkTheme={darkTheme}
          />
          <BlogContent
            owner={blog.post.owner}
            createdAt={blog.post.createdAt}
            readingTime={blog.post.reading_time}
            body={blog.post.body}
            state={blog.post.state}
            loading={isPublishing}
            publishBlogHandler={publishBlogHandler}
            deleteBlogHandler={deleteBlogHandler}
            userId={userId}
            darkTheme={darkTheme}
            coverImage={blog.post.image[0]}
            isDeleting={isDeleting}
            postId={blog.post._id}
            comment={blog.comment}
          />
        </div>
      </div>
    );
  }

  if (error) content = <div>An error occured</div>;
  return content;
};

export default Blog;
