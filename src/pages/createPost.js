import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import classes from "../styles/CreateBlog.module.css";
const CreateBlog = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <div className={classes.Create}>
        {/* <CKEditor
        data={content}
        editor={ClassicEditor}
        onChange={(e, editor) => {
          setContent(editor.getData());
          console.log(editor.getData(), e);
        }}
      /> */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(a, b, c, d) => {
            console.log(a);
            // console.log(d.getContents());
            setContent("helo");
          }}
        />
      </div>
    </div>
  );
};

export default CreateBlog;
