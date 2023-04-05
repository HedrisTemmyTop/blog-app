import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CreateBlog.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { POST_BLOG_REQUEST } from "../redux/reducers/blogReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { GET_BLOG } from "../redux/actions/blogs/blogsAction";
import axios from "axios";
import API_URL from "../api/URL";

const CreateBlog = (props) => {
  const token = localStorage.getItem("token");

  console.log(token);

  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const [html, setHtml] = useState(null);
  const formRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [image, setImage] = useState(null);
  const postId = useParams();
  const dispatch = useDispatch();
  const { blogs, post_blog } = useSelector((state) => state);

  const { mssg, loading, error, success } = post_blog;
  // const { blog } = useSelector((state) => state.blogs);
  if (blogs) {
    console.log(blogs);
  }
  useEffect(() => {
    if (postId.id) {
      dispatch(GET_BLOG(postId.id));
    }
    console.log("yes");
  }, []);
  useEffect(() => {
    const { blog } = blogs;
    if (blogs.blog) {
      setHtml(blog.body);
      setTags(blog.tags);
      setTitle(blog.title);
      // setImage()
      // setDescription()
    }
  }, [blogs]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.type === "change") {
      const selectedImage = event.target.files[0];
      console.log(event);
      if (selectedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onload = () => {
          setImage(reader.result);
        };
      }
      return;
    }
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const createTagHandler = (e) => {
    if (e.key === "Enter" && !tags.includes(tagsInput)) {
      e.preventDefault();
      setTags((prev) => [tagsInput, ...prev]);
      return setTagsInput("");
    }
  };
  const removeTagHandler = (tagId) => {
    console.log(tagId, tags);
    const removedTag = tags.filter((tag) => tag !== tagId);
    setTags(removedTag);
  };

  let tagContent = null;
  if (tags.length > 0) {
    tagContent = tags.map((tag) => (
      <div
        className={classes.AddedTag}
        key={tag}
        onClick={(e) => {
          removeTagHandler(tag);
        }}
      >
        {tag}
      </div>
    ));
  }
  const blogFormValidation = (state = "draft") => {
    if (!html) {
      alert("Body is empty");
      return false;
    }
    if (!image) {
      alert("Add content image");
      return false;
    }
    return {
      title: title,
      body: html,
      content_image: image,
      tags: tags,
      state: "draft",
    };
  };
  const submitBlogHandler = (e) => {
    e.preventDefault();
    const data = blogFormValidation();
    props.sendBlog(data, token);
  };
  const editBlogHandler = (e) => {
    e.preventDefault();
    const data = blogFormValidation();
    axios.put(API_URL + "blogs/" + postId.id, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  return token ? (
    <div>
      <div className={classes.ToggleBtns}>
        <button
          className={classes.ToggleBtn}
          onClick={() => {
            previewRef.current.style.display = "none";
            formRef.current.style.display = "block";
          }}
        >
          Write
        </button>
        <button
          className={classes.ToggleBtn}
          onClick={() => {
            previewRef.current.style.display = "block";
            formRef.current.style.display = "none";
          }}
        >
          Preview
        </button>
      </div>
      <div className={classes.CreateBlogContainer}>
        <form
          className={classes.Form}
          ref={formRef}
          onSubmit={postId.id ? submitBlogHandler : editBlogHandler}
        >
          <input
            required
            type="text"
            placeholder="Blog title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <input
            onKeyDown={(e) => {
              createTagHandler(e);
            }}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            type="text"
            placeholder="Blog tags/categories"
            style={{ marginBottom: ".2rem" }}
          />
          <div className={classes.TagsContainer}>{tagContent}</div>
          <input
            required
            type="text"
            placeholder="Short description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Editor
            apiKey="hq72u3l6csp24wgfwbyp8bjoa38ccw4t2fifrabjc5wzkjog"
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={html ? html : ""}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              placeholder: "Write your blog",
              setup: (editor) => {
                editor.on("keyup", () => {
                  setHtml(editorRef.current.getContent());
                  console.log(editor.getContent());
                  previewRef.current.innerHTML = editor.getContent();
                });
              },
              plugins:
                "preview importcss  autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}
          />
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed white",
              padding: "30px",
              fontSize: "2rem",
              color: "white",
              position: "relative",
              marginTop: "2rem",
            }}
          >
            <input
              className={classes.UploadInput}
              type="file"
              onChange={handleDrop}
            />
            {image ? (
              <img src={image} alt="uploaded" style={{ maxWidth: "100%" }} />
            ) : (
              <p>Drag an image here to upload</p>
            )}
          </div>
          <button
            className={classes.PostBtn}
            disabled={loading ? true : false}
            style={
              loading ? { backgroundColor: "rgb(17, 25, 38) !important" } : null
            }
          >
            <span>{loading ? "Processing..." : "Post Blog"}</span>
          </button>
        </form>
        <div
          className={classes.Preview}
          ref={previewRef}
          id="previewCode"
        ></div>
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" replace={true} />
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.post_blog,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendBlog: (blogContent, token) => {
      dispatch(POST_BLOG_REQUEST(blogContent, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
