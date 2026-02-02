import { useState, useRef } from "react";
import {
  X,
  Video,
  FileText,
  HelpCircle,
  BookOpen,
  UploadCloud,
  Loader2,
} from "lucide-react";

import AssignmentForm from "./AssignmentForm";
import QuizForm from "./QuizForm";

const AddLesson = ({ isOpen, onClose, onAdd, moduleId }) => {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("video");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    description: "",
    instructions: "",
    dueDate: "",
    maxPoints: 100,
    maxFileSize: 10,
  });
  const [quizData, setQuizData] = useState({
    timeLimit: 30,
    passingScore: 70,
    description: "",
    questions: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const contentTypes = [
    {
      id: "video",
      label: "Video",
      icon: <Video className="w-5 h-5 text-blue-600" />,
      activeClass: "bg-blue-50 border-blue-500 text-blue-700",
      baseClass: "border-stone-200 text-stone-600",
    },
    {
      id: "document",
      label: "Document",
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      activeClass: "bg-amber-50 border-amber-500 text-amber-700",
      baseClass: "border-stone-200 text-stone-600",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: <HelpCircle className="w-5 h-5 text-purple-600" />,
      activeClass: "bg-purple-50 border-purple-500 text-purple-700",
      baseClass: "border-stone-200 text-stone-600",
    },
    {
      id: "assignment",
      label: "Assignment",
      icon: <BookOpen className="w-5 h-5 text-orange-600" />,
      activeClass: "bg-orange-50 border-orange-500 text-orange-700",
      baseClass: "border-stone-200 text-stone-600",
    },
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newContent = {
      id: Date.now(),
      title,
      type: contentType,
      link: contentType === "video" ? link : null,
      fileName: file ? file.name : null,
      duration: contentType === "video" ? "00:00" : null,
      assignment: contentType === "assignment" ? assignmentData : null,
      quiz: contentType === "quiz" ? quizData : null,
    };

    onAdd(moduleId, newContent);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setContentType("video");
    setLink("");
    setFile(null);
    setAssignmentData({
      description: "",
      instructions: "",
      dueDate: "",
      maxPoints: 100,
      maxFileSize: 10,
    });
    setQuizData({
      timeLimit: 30,
      passingScore: 70,
      description: "",
      questions: [],
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-8 bg-gradient-to-br from-teal-600 to-teal-800 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black arimo-font tracking-tight">
                Add New Lesson
              </h2>
              <p className="text-white/80 mt-1 font-medium inter-font">
                Create engaging course materials
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
          {/* Lesson Title */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to React"
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
              Content Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all group ${
                    contentType === type.id
                      ? type.activeClass
                      : type.baseClass +
                        " hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-transform group-active:scale-90 ${contentType === type.id ? "bg-white" : "bg-stone-100"}`}
                  >
                    {type.icon}
                  </div>
                  <span className="text-sm font-bold arimo-font">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Link */}
          {contentType === "video" && (
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/video"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-blue-600/70 inter-font"
              />
            </div>
          )}

          {/* Conditional Form Sections */}
          {contentType === "assignment" ? (
            <AssignmentForm
              data={assignmentData}
              onChange={setAssignmentData}
            />
          ) : contentType === "quiz" ? (
            <QuizForm data={quizData} onChange={setQuizData} />
          ) : (
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                Upload{" "}
                {contentType.charAt(0).toUpperCase() + contentType.slice(1)}{" "}
                File
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-stone-200 rounded-[2rem] hover:border-teal-400 hover:bg-teal-50/10 transition-all group cursor-pointer relative"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center text-center">
                  {isUploading ? (
                    <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                      <UploadCloud className="w-8 h-8 text-stone-400" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h4 className="text-stone-900 font-bold arimo-font">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </h4>
                    <p className="text-stone-400 text-sm font-medium inter-font">
                      {contentType === "video"
                        ? "MP4, MOV, AVI (max 500MB)"
                        : contentType === "document"
                          ? "PDF, DOCX (max 100MB)"
                          : "Files (max 100MB)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl text-stone-600 font-bold hover:bg-stone-200 transition-all arimo-font"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-greenTeal hover:bg-teal-700 text-white rounded-xl font-black shadow-lg shadow-teal-900/10 active:scale-95 transition-all arimo-font"
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
