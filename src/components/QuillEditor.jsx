import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = ({ value, onChange, placeholder = "Write something amazing...", className = "" }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className={`quill-editor-wrapper ${className}`}>
      <style>{`
        .quill-editor-wrapper .ql-toolbar {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border-color: #e4e4e7;
          background: #fafafa;
        }
        .quill-editor-wrapper .ql-container {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          border-color: #e4e4e7;
          min-height: 150px;
          font-family: 'Arimo', sans-serif;
          font-size: 14px;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 150px;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #a1a1aa;
          font-style: normal;
        }
        .quill-editor-wrapper .ql-snow .ql-stroke {
          stroke: #71717a;
        }
        .quill-editor-wrapper .ql-snow .ql-fill {
          fill: #71717a;
        }
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #0d9488;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default QuillEditor;
