import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CreateBlog.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { POST_BLOG_REQUEST } from "../redux/reducers/blogReducer";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GET_BLOG } from "../redux/actions/blogs/blogsAction";

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
  const state = useSelector((state) => state);
  console.log(postId);
  useEffect(() => {
    if (postId.id) {
      console.log(postId.id);
      dispatch(GET_BLOG(postId.id));
    }
  });
  if (state) {
    console.log(state);
  }
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
        // onClick={removeTagHandler(tag)}
      >
        {tag}
      </div>
    ));
  }
  const submitBlogHandler = (e) => {
    e.preventDefault();
    if (!html) {
      alert("Body is empty");
      return false;
    }
    if (!image) {
      alert("Add content image");
      return false;
    }
    const data = {
      title: title,
      body: html,
      content_image: image,
      tags: tags,
    };
    props.sendBlog(data, token);
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
          onSubmit={submitBlogHandler}
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
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
          <button className={classes.PostBtn}>
            <span>Post Blog</span>
          </button>
        </form>
        <div className={classes.Preview} ref={previewRef} id="previewCode">
          <h1
            style={{
              fontSize: "4rem",
              marginTop: "2rem",
              color: "black",
            }}
          >
            {title}
          </h1>
          {/* {html ? html : null} */}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" replace={true} />
  );
};
const mapStateToProps = (state) => {
  return {
    ...state,
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
