import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CreateBlog.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { GET_BLOG } from "../redux";

import uploadImage from "../logic/uploadImage";
import formValidation from "../logic/blogFormValidation";
import publishBlog from "../logic/publishBlog";
import CreateBlogForm from "../components/ui/CreateBlog/CreateBlogForm";
import Preview from "../components/ui/CreateBlog/Preview";

import { useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/context";
import { Spinner } from "../components/ui/Blogs";
import StateTypes, { PostBlogInterface } from "../Interface/BlogInterface";
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
// interface blogFormInterface {
//   title: string;
//   body: string;
//   image: string[];
//   tags: string[];
//   description: string;
//   state: string;
//   reading_time: number;
//   html?: string;
// }
const EditPost = () => {
  // local storage variable
  const token: string = localStorage.getItem("token")!;

  //  Refs and params
  const { id } = useParams<string>();
  const dispatch: any = useDispatch();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const { darkTheme } = useContext(ThemeContext);

  // useState
  const [html, setHtml] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const state = useSelector((state: StateTypes) => state);
  const [postingError, setPostingError] = useState<string | null>(null);
  const { mssg, loading, error, success }: PostBlogInterface = state.post_blog;

  // If there is an id that means user wants to edit so fetch their blog
  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
    if (id) {
      dispatch(GET_BLOG(id));
    }
  }, [dispatch, id]);

  // If you get a blog from the backend, update the fields
  useEffect(() => {
    if (state.blogs.blog) {
      const { blog }: any = state.blogs;
      setHtml(blog.post.body);
      setTags(blog.post.tags);
      setTitle(blog.post.title);
      setDescription(blog.post.description);
      setImage(blog.post.image[0]);
    }
  }, [state.blogs]);

  // if user is not authorized
  useEffect(() => {
    setIsPublishing(false);
    if (error === "Unauthorized" || postingError === "Unauthorized") {
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
  }, [error, postingError]);

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
    if (published) {
      setTimeout(() => {
        window.history.back();
      }, 2500);
    }
  }, [success, published]);

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
  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
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

  const blogFormValidation = (state = "draft"): any => {
    return formValidation(html, image, title, tags, description, state);
  };

  const handleAddTag = () => {
    if (!tags.includes(tagsInput) && tagsInput.split("").length > 0) {
      setTags((prev) => [tagsInput, ...prev]);
      return setTagsInput("");
    }
  };

  // Edit a blog
  const editBlogHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const validation = blogFormValidation();
    if (validation) {
      const updatedData: any = validation; // Get datas from validated inputs

      const route = "blogs/";
      setIsPublishing(true);
      interface dataInterface {
        status: number;
        message: string;
        response: {
          data: string;
        };
      }
      const data: dataInterface = (await publishBlog(
        id as string,
        token,
        route,
        updatedData
      )) as dataInterface; // Update it at the backend
      setIsPublishing(false);

      if (data.status >= 200 && data.status < 300) {
        toast.success("Blog editted successfully 😎😍", {
          autoClose: 2000,
          toastId: "toast-success",
        });
        setPublished(true);
      } else {
        setPostingError(data.response ? data.response.data : data.message);
        toast.error(
          data.response ? data.response.data : data.message + "😨😰",
          {
            autoClose: 2100,
            toastId: "toast-error",
          }
        );
      }
    }
  };
  const handleReload = () => {
    window.location.reload();
  };
  let content: JSX.Element | null = null;
  if (state.loading)
    content = content = (
      <div style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}>
        {" "}
        <Spinner />
      </div>
    );

  if (state.blogs)
    content = (
      <div>
        <Preview
          handleHide={handleHidePreview}
          handleShow={handleShowPreview}
        />
        <div className={classes.CreateBlogContainer}>
          <CreateBlogForm
            darkTheme={darkTheme}
            formRef={formRef}
            handleAddTag={handleAddTag}
            submit={editBlogHandler}
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
    );
  if (state.error)
    content = (
      <div
        style={
          darkTheme
            ? {
                color: "#fff",
                display: "grid",
                placeItems: "center",
                paddingTop: "2rem",
              }
            : {
                color: "#111926",
                display: "grid",
                placeItems: "center",
                paddingBlock: "6rem",
              }
        }
      >
        <span>
          An error occured
          <button
            onClick={handleReload}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.4rem",
              borderRadius: ".5rem",
              marginLeft: "1rem",
            }}
          >
            Tap to reload
          </button>
        </span>
      </div>
    );
  return token ? content : <Navigate to="/sign-in" replace={true} />;
};

export default EditPost;
