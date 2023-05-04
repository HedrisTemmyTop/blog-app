import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CreateBlog.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { GET_BLOG, POST_BLOG_REQUEST } from "../redux";

import uploadImage from "../logic/uploadImage";
import formValidation from "../logic/blogFormValidation";
import publishBlog from "../logic/publishBlog";
import CreateBlogForm from "../components/ui/CreateBlog/CreateBlogForm";
import Preview from "../components/ui/CreateBlog/Preview";
import ErrorHandler from "../logic/errorHandler";
import AlertMessage from "../components/alertMessage/alertMessage";
import { useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/context";
/**This component uses two case
 *  1.) When user wants to edit a blog
 * PROCEDURE
 * There's a blog id passed throug the route, get the id, and use it to fetch the particular blog from the backend
 * Then update the already loaded input fields with the data using another useEffect that only runs when there's a data from backend
 * 2.) When user wants to create a blog
 * PROCEDURE
 * Fill the forms and submit
 *
 */

const CreateNewPost = (props) => {
  // local storage variable
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const previewRef = useRef(null);
  const formRef = useRef(null);
  const { darkTheme } = useContext(ThemeContext);

  // useState
  const [html, setHtml] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [image, setImage] = useState(null);
  const { post_blog } = useSelector((state) => state);
  const { mssg, loading, error, success } = post_blog;

  // if user is not authorized
  useEffect(() => {
    if (error === "Unauthorized") {
      setTimeout(() => {
        window.location.href = `/sign-in`;
      }, 3000);
    }
  }, [error]);

  //Once the blog is posted successfully
  useEffect(() => {
    if (success) {
      toast.success("Blog posted successfully 😍😎", {
        autoClose: 2000,
        toastId: "toast-success",
      });
      setTimeout(() => {
        window.location.href = `/blogs/${mssg.data.blog._id}`;
      }, 2500);
    }
  }, [success]);
  // once you click on the upload image, open files and upload get the selected image or u drag image to the box
  const handleDrop = (event) => {
    event.preventDefault();
    uploadImage(event, setImage);
  };

  // Create a tag when user presses the enter key word
  const createTagHandler = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && !tags.includes(tagsInput)) {
      e.preventDefault();
      setTags((prev) => [tagsInput, ...prev]);
      return setTagsInput("");
    }
  };

  // Remove a tag by clicking on the tag
  const removeTagHandler = (tagId) => {
    const removedTag = tags.filter((tag) => tag !== tagId);
    setTags(removedTag);
  };

  // Validat form inputs
  const blogFormValidation = (state = "draft") => {
    return formValidation(html, image, title, tags, description, state);
  };

  // Post a blog function
  const submitBlogHandler = (e) => {
    e.preventDefault();
    const data = blogFormValidation(); // Get datas from validated inputs
    if (data !== false) {
      if (data) {
        setIsPublishing(true);
        dispatch(POST_BLOG_REQUEST(data, token));
      } // Send it to the backend
    }
  };

  const handleAddTag = () => {
    if (!tags.includes(tagsInput) && tagsInput.split("").length > 0) {
      setTags((prev) => [tagsInput, ...prev]);
      return setTagsInput("");
    }
  };

  let content = (
    <ErrorHandler
      errorMessage={error}
      duration={error === "Unauthorized" ? 2800 : 5000}
    >
      <div>
        <Preview previewRef={previewRef} formRef={formRef} />
        <div className={classes.CreateBlogContainer}>
          <CreateBlogForm
            darkTheme={darkTheme}
            handleAddTag={handleAddTag}
            formRef={formRef}
            submitBlogHandler={submitBlogHandler}
            title={title}
            setHtml={setHtml}
            setTagsInput={setTagsInput}
            tagsInput={tagsInput}
            createTagHandler={createTagHandler}
            setTitle={setTitle}
            html={html}
            description={description}
            tags={tags}
            previewRef={previewRef}
            handleDrop={handleDrop}
            image={image}
            loading={loading}
            isPublishing={isPublishing}
            removeTagHandler={removeTagHandler}
            setDescription={setDescription}
          />
          <div
            className={classes.Preview}
            ref={previewRef}
            id="previewCode"
          ></div>
        </div>
      </div>
      <AlertMessage duration={2000} />
    </ErrorHandler>
  );

  return token ? content : <Navigate to="/sign-in" replace={true} />;
};

export default CreateNewPost;
