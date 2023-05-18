import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CreateBlog.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { POST_BLOG_REQUEST } from "../redux";
import axios from "axios";
import uploadImage from "../logic/uploadImage";
import formValidation from "../logic/blogFormValidation";
import CreateBlogForm from "../components/ui/CreateBlog/CreateBlogForm";
import Preview from "../components/ui/CreateBlog/Preview";

import { useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/context";
import StateTypes from "../Interface/BlogInterface";
import API_URL from "../api/URL";
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

const CreateNewPost = () => {
  // local storage variable
  const token: string = localStorage.getItem("token")!;

  const dispatch: any = useDispatch();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { darkTheme } = useContext(ThemeContext);

  // useState
  const [html, setHtml] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { post_blog } = useSelector((state: StateTypes) => state);
  const { mssg, loading, error, success } = post_blog;

  // if user is not authorized
  useEffect(() => {
    setIsPublishing(false);

    if (error === "Unauthorized") {
      setTimeout(() => {
        window.location.href = `/sign-in`;
      }, 3000);
    }
    if (error && error !== "Unauthorized") {
      toast.error(error, {
        autoClose: 5000,
        toastId: "toast-error",
      });
      dispatch({ type: "RESET_STATE" });
    }
  }, [error]);

  //Once the blog is posted successfully
  useEffect(() => {
    setIsPublishing(false);
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

  // show preview
  const handleShowPreview = () => {
    if (formRef.current && previewRef.current) {
      previewRef.current.style.display = "block";
      formRef.current.style.display = "none";
    }
  };

  const handleHidePreview = () => {
    if (formRef.current && previewRef.current) {
      previewRef.current.style.display = "none";
      formRef.current.style.display = "block";
    }
  };
  // once you click on the upload image, open files and upload get the selected image or u drag image to the box
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    uploadImage(event, setImage);
  };

  // Create a tag when user presses the enter key word
  const createTagHandler = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.keyCode === 13) && !tags.includes(tagsInput)) {
      e.preventDefault();
      setTags((prev: string[]) => [tagsInput, ...prev]);
      return setTagsInput("");
    }
  };

  // Remove a tag by clicking on the tag
  const removeTagHandler = (tagId: string) => {
    const removedTag = tags.filter((tag) => tag !== tagId);
    setTags(removedTag);
  };

  // Validat form inputs
  const blogFormValidation = (state = "draft") => {
    return formValidation(html, image, title, tags, description, state);
  };
  // Post a blog function
  const submitBlogHandler = (event: React.FormEvent<HTMLFormElement>): any => {
    event.preventDefault();
    console.log("posting");
    const data = blogFormValidation(); // Get datas from validated inputs
    if (data !== false) {
      if (data) {
        setIsPublishing(true);
        console.log(token);
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
    <div>
      <Preview handleShow={handleShowPreview} handleHide={handleHidePreview} />
      <div className={classes.CreateBlogContainer}>
        <CreateBlogForm
          darkTheme={darkTheme}
          handleAddTag={handleAddTag}
          formRef={formRef}
          submit={submitBlogHandler}
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
          style={darkTheme ? { color: "white" } : { color: "black" }}
        ></div>
      </div>
    </div>
  );

  return token ? content : <Navigate to="/sign-in" replace={true} />;
};

export default CreateNewPost;
