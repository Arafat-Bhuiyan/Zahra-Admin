import React, { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

const PrivacyPolicy = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(value || "");
  const [fontSize, setFontSize] = useState("14");
  const editorRef = useRef(null);

  useEffect(() => {
    if (!isEditing) {
      setEditorContent(value || "");
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (!isEditing && editorRef.current) {
      editorRef.current.innerHTML = editorContent || "<p></p>";
    }
  }, [isEditing, editorContent]);

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.innerHTML = editorContent || "<p></p>";
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      const el = editorRef.current;
      if (!el) return;
      const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData?.getData("text/plain") ?? "";
        document.execCommand("insertText", false, text);
      };
      el.addEventListener("paste", handlePaste);
      return () => el.removeEventListener("paste", handlePaste);
    }
  }, [isEditing]);

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    setEditorContent(html);
    if (onChange) onChange(html);
  };

  const applyFormat = (command, value) => {
    if (editorRef.current && isEditing) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    applyFormat("fontSize", newSize);
  };

  return (
    <div className="w-full bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col">
      <div className="p-6 flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
            Privacy Policy
          </h2>
          <p className="text-gray-500 text-base font-normal arimo-font leading-6 mt-1">
            Update the privacy policy content shown to your users.
          </p>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 bg-greenTeal rounded-[10px] text-white text-sm font-medium leading-5 hover:bg-greenTeal/90 transition-colors"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="flex items-center flex-wrap gap-2 px-6 pb-3 border-t border-gray-200 bg-gray-50">
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {[10, 12, 14, 16, 18, 20, 24].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className="w-px h-6 bg-gray-300" />

          <button
            onClick={() => applyFormat("bold")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => applyFormat("italic")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => applyFormat("underline")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Underline"
          >
            <Underline size={16} />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          <button
            onClick={() => applyFormat("justifyLeft")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => applyFormat("justifyCenter")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => applyFormat("justifyRight")}
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>
      )}

      <div className="p-6">
        {isEditing ? (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="min-h-[300px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 leading-relaxed bg-white"
            style={{ fontSize: `${fontSize}px` }}
            onInput={handleInput}
          />
        ) : (
          <div
            ref={editorRef}
            className="min-h-[300px] p-4 border rounded-lg focus:outline-none focus:ring-2 leading-relaxed bg-white border-transparent"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: editorContent || "<p></p>" }}
          />
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
