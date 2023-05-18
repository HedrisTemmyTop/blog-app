import { useRef } from "react";
import classes from "../../../styles/CreateBlog.module.css";
import TextEditor from "../../Editor/Editor";

interface PropTypes {
  formRef: React.RefObject<HTMLFormElement>;
  title: string;
  tagsInput: string;

  html: string;
  description: string;
  darkTheme: boolean;
  loading: boolean;
  previewRef: React.RefObject<HTMLDivElement>;
  image: string;
  isPublishing: boolean;
  tags: string[];
  handleDrop: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  createTagHandler: (e: React.KeyboardEvent) => void;
  setDescription: (val: string) => void;
  setHtml: (val: string) => void;
  setTitle: (val: string) => void;
  removeTagHandler: (val: string) => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;

  setTagsInput: (val: string) => void;
  handleAddTag: () => void;
}
const CreateBlogForm = (props: PropTypes) => {
  const {
    formRef,
    submit,
    title,
    setHtml,
    setTagsInput,
    tagsInput,
    createTagHandler,

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
    handleAddTag,
  } = props;
  const editorRef = useRef<HTMLFormElement | null>(null);

  const handleKeyUp = (html: string) => {
    setHtml(html);
    const previewEl: HTMLDivElement = previewRef.current!;
    previewEl.innerHTML = html;
  };

  return (
    <form
      className={darkTheme ? classes.FormLight : classes.Form}
      ref={formRef}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => submit(event)}
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
        onKeyDown={(e: React.KeyboardEvent) => {
          createTagHandler(e);
        }}
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        type="text"
        placeholder="Blog tags/categories"
      />
      <div className={classes.TagsContainer}>
        {tags.map((tag: string) => (
          <div
            className={classes.AddedTag}
            key={tag}
            onClick={() => removeTagHandler(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
      <button
        className={classes.CreateBtn}
        type="button"
        onClick={handleAddTag}
      >
        Create Tag
      </button>
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

      <TextEditor handleKeyUp={handleKeyUp} html={html} />
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
          <p style={darkTheme ? { color: "#fff" } : { color: "#111926" }}>
            Upload/Drag an image here{" "}
          </p>
        )}
      </div>
      <button
        className={classes.PostBtn}
        disabled={isPublishing ? true : false}
        style={
          isPublishing ? { backgroundColor: "rgb(17, 25, 38) !important" } : {}
        }
      >
        <span>{isPublishing ? "Processing..." : "Post Blog"}</span>
      </button>
    </form>
  );
};

export default CreateBlogForm;
