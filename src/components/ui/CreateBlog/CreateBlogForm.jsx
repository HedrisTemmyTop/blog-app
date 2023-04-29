import { useRef } from "react";
import classes from "../../../styles/CreateBlog.module.css";
import TextEditor from "../../Editor/Editor";
const CreateBlogForm = (props) => {
  const {
    formRef,
    submitBlogHandler,
    editBlogHandler,
    title,
    setHtml,
    setTagsInput,
    tagsInput,
    createTagHandler,
    postId,
    setTitle,
    html,
    description,
    darkTheme,
    previewRef,
    handleDrop,
    image,
    setDescription,
    tags,
    removeTagHandler,
    isPublishing,
  } = props;
  console.log(tags);
  const editorRef = useRef(null);

  return (
    <form
      className={darkTheme ? classes.FormLight : classes.Form}
      ref={formRef}
      onSubmit={!postId ? submitBlogHandler : editBlogHandler}
    >
      <input
        style={
          !darkTheme
            ? { border: "2px solid #e5e7eb" }
            : { border: "2px solid #e5e7eb" }
        }
        required
        type="text"
        placeholder="Blog title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <input
        style={
          !darkTheme
            ? { border: "2px solid #e5e7eb" }
            : { border: "2px solid #e5e7eb" }
        }
        onKeyDown={(e) => {
          createTagHandler(e);
        }}
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        type="text"
        placeholder="Blog tags/categories"
      />
      <div className={classes.TagsContainer}>
        {tags.map((tag) => (
          <div
            className={classes.AddedTag}
            key={tag}
            onClick={() => removeTagHandler(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <input
        style={
          !darkTheme
            ? { border: "2px solid #e5e7eb" }
            : { border: "2px solid #e5e7eb" }
        }
        required
        type="text"
        placeholder="Short description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <TextEditor
        html={html}
        editorRef={editorRef}
        previewRef={previewRef}
        setHtml={setHtml}
      />
      <div onDragOver={handleDrop} onDrop={handleDrop} className={classes.View}>
        <input
          className={classes.UploadInput}
          type="file"
          onChange={handleDrop}
        />
        {image ? (
          <img
            src={image}
            alt="uploaded"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          <p>Upload/Drag an image here </p>
        )}
      </div>
      <button
        className={classes.PostBtn}
        disabled={isPublishing ? true : false}
        style={
          isPublishing
            ? { backgroundColor: "rgb(17, 25, 38) !important" }
            : null
        }
      >
        <span>{isPublishing ? "Processing..." : "Post Blog"}</span>
      </button>
    </form>
  );
};

export default CreateBlogForm;
