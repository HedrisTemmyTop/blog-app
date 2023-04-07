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

    previewRef,
    handleDrop,
    image,
    loading,
    setDescription,
    tags,
    removeTagHandler,
  } = props;
  console.log(tags);
  const editorRef = useRef(null);

  return (
    <form
      className={classes.Form}
      ref={formRef}
      onSubmit={!postId.id ? submitBlogHandler : editBlogHandler}
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
  );
};

export default CreateBlogForm;
