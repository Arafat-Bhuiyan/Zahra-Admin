import React, { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

const TermsAndConditions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(`<ul>
<li>Lorem ipsum dolor sit amet consectetur. Lacus at venenatis gravida vivamus mauris. Quisque mi est vel dis. Donec rhoncus laoreet odio orci sed risus elit accumsan. Mattis ut est tristique amet vitae at aliquet. Ac vel porttitor egestas scelerisque enim quisque senectus. Euismod ultricies vulputate id cras bibendum sollicitudin proin odio bibendum. Velit velit in scelerisque erat etiam rutrum phasellus nunc. Sed lectus sed a at eget. Nunc purus sed quis at risus. Consectetur nibh justo proin placerat condimentum id at adipiscing.</li>
<li>Vel blandit mi nulla sodales consectetur. Egestas tristique ultrices gravida duis nisl odio. Posuere curabitur eu platea pellentesque ut. Facilisi elementum neque mauris facilisis in. Cursus condimentum ipsum pretium consequat turpis at porttitor nisl.</li>
<li>Scelerisque tellus praesent condimentum euismod a faucibus. Auctor at ultricies at urna aliquam massa pellentesque. Vitae vulputate nulla diam placerat m.</li>
</ul>`);

  const [editContent, setEditContent] = useState(content);
  const [fontSize, setFontSize] = useState("14");
  const editorRef = useRef(null);

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

  const handleSaveEdit = () => {
    const html = editorRef.current?.innerHTML ?? editContent;
    setContent(html);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(content);
    setIsEditing(false);
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
    applyFontSizeToSelection(newSize);
  };

  const applyFontSizeToSelection = (size) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range) {
      const span = document.createElement("span");
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
            Terms & Conditions
          </h2>
          <p className="text-gray-500 text-base font-normal arimo-font leading-6 mt-1">
            Manage your platform's terms of service
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-greenTeal text-white font-semibold rounded hover:bg-opacity-90 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center flex-wrap gap-2 p-2 border border-gray-300 rounded bg-gray-50">
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

      {isEditing ? (
        <>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="min-h-[400px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 text-gray-800 leading-relaxed bg-white"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{
              __html: (editContent ?? content ?? "").replace(/\n/g, "<br>"),
            }}
            onBlur={(e) =>
              setEditContent(e.currentTarget.innerHTML.replace(/<br>/g, "\n"))
            }
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSaveEdit}
              className="px-6 py-2 bg-greenTeal text-white font-semibold rounded hover:bg-opacity-90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="prose prose-sm max-w-none bg-white p-6 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
