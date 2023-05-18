import { Editor } from "@tinymce/tinymce-react";

interface PropTypes {
  html: string;
  // editorRefCurrent: React.RefObject<HTMLFormElement>;

  handleKeyUp: (editor: any) => void;
}

const TextEditor = (props: PropTypes) => {
  const { html, handleKeyUp } = props;
  return (
    <Editor
      apiKey="hq72u3l6csp24wgfwbyp8bjoa38ccw4t2fifrabjc5wzkjog"
      onInit={(evt, editor) => {}}
      value={html ? html : ""}
      initialValue=""
      init={{
        height: 500,

        placeholder: "Write your blog",
        setup: (editor) => {
          editor.on("keyup", () => {
            handleKeyUp(editor.getContent());
          });
        },
        plugins:
          "preview importcss  autolink autosave save directionality code visualblocks visualchars fullscreen image link media   table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount   quickbars emoticons",
        imagetools_cors_hosts: ["picsum.photos"],
        menubar: "file edit view insert format  table ",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample ",

        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
      }}
    />
  );
};

export default TextEditor;
