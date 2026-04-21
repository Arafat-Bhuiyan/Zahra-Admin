import { useState, useRef, useEffect } from "react";
import {
  X,
  Video,
  FileText,
  HelpCircle,
  BookOpen,
  UploadCloud,
  Loader2,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import AssignmentForm from "./AssignmentForm";
import QuizForm from "./QuizForm";
import {
  useCreateModuleLessonMutation,
  useLazyGetVideoStatusQuery,
  useCreateLessonQuizMutation,
  useCreateLessonAssignmentMutation,
} from "../../Api/adminApi";

const AddLesson = ({ isOpen, onClose, courseId, moduleId }) => {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("video");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  
  // New fields for Live
  const [liveDate, setLiveDate] = useState("");
  const [liveTime, setLiveTime] = useState("");
  
  // New fields from backend schema
  const [duration, setDuration] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isReleased, setIsReleased] = useState(true);

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoStatus, setVideoStatus] = useState(null); // null, 'uploading', 'processing', 'ready', 'error'
  const fileInputRef = useRef(null);

  // API hooks
  const [createLesson] = useCreateModuleLessonMutation();
  const [getVideoStatus] = useLazyGetVideoStatusQuery();
  const [createQuiz] = useCreateLessonQuizMutation();
  const [createAssignment] = useCreateLessonAssignmentMutation();

  const pollingIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, []);

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
    {
      id: "live",
      label: "Live Session",
      icon: <Video className="w-5 h-5 text-red-600" />,
      activeClass: "bg-red-50 border-red-500 text-red-700",
      baseClass: "border-stone-200 text-stone-600",
    },
    {
      id: "external_link",
      label: "External Link",
      icon: <ExternalLink className="w-5 h-5 text-teal-600" />,
      activeClass: "bg-teal-50 border-teal-500 text-teal-700",
      baseClass: "border-stone-200 text-stone-600",
    },
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const startPolling = (lessonId) => {
    setVideoStatus('processing');
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const { data } = await getVideoStatus({ 
          course_pk: courseId, 
          module_pk: moduleId, 
          id: lessonId 
        });
        if (data?.bunny_video_status === "ready") {
          setVideoStatus('ready');
          clearInterval(pollingIntervalRef.current);
          toast.success("Video is ready!");
        } else if (data?.bunny_video_status === "failed") {
          setVideoStatus('error');
          clearInterval(pollingIntervalRef.current);
          toast.error("Video processing failed.");
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 10000); // 10 seconds
  };

  const mapQuizDataToBackend = (data, lessonTitle) => {
    return {
      title: lessonTitle,
      time_limit: parseInt(data.timeLimit) || 30,
      passing_score: parseInt(data.passingScore) || 70,
      questions: (data.questions || []).map(q => ({
        text: q.text,
        options: (q.options || []).map((opt, idx) => ({
          text: opt,
          is_correct: parseInt(q.correctAnswer) === idx
        }))
      }))
    };
  };

  const mapAssignmentDataToBackend = (data) => {
    return {
      description: data.description || "",
      instructions: data.instructions || "",
      due_date: data.dueDate ? `${data.dueDate}T23:59:00Z` : null,
      max_points: parseInt(data.maxPoints) || 100,
      allowed_file_types: "pdf, docx",
      max_file_size: parseInt(data.maxFileSize) || 10
    };
  };

  const handleSubmit = async () => {
    if (isUploading) return;
    if (!title.trim()) {
      toast.error("Please enter a lesson title");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("content_type", contentType);

      if (contentType === "live") {
        await createLesson({ 
          course_pk: courseId, 
          module_pk: moduleId, 
          body: { 
            title, 
            content_type: "live",
            scheduled_at: `${liveDate}T${liveTime}:00Z`,
            duration_in_minutes: duration || 0,
            is_preview: isPreview,
            is_released: isReleased
          } 
        }).unwrap();
        toast.success("Live session scheduled successfully!");
        onClose();
        resetForm();
        return;
      } else if (contentType === "external_link") {
        await createLesson({ 
          course_pk: courseId, 
          module_pk: moduleId, 
          body: { 
            title, 
            content_type: "external_link",
            content: link,
            duration_in_minutes: duration || 0,
            is_preview: isPreview,
            is_released: isReleased
          } 
        }).unwrap();
        toast.success("External link lesson created!");
        onClose();
        resetForm();
        return;
      } else if (contentType === "video") {
        if (file) {
          // Special Video Flow
          // 1. POST metadata
          const res = await createLesson({ 
            course_pk: courseId, 
            module_pk: moduleId, 
            body: { 
              title, 
              content_type: "video",
              duration_in_minutes: duration || 0,
              is_preview: isPreview,
              is_released: isReleased
            } 
          }).unwrap();

          if (res.video_upload?.upload_url) {
            setVideoStatus('uploading');
            // 2. PUT file with headers
            const putRes = await fetch(res.video_upload.upload_url, {
              method: res.video_upload.upload_method || "PUT",
              headers: res.video_upload.upload_headers || {},
              body: file,
            });

            if (!putRes.ok) throw new Error("Video upload failed");
            
            // 3. Start Polling
            startPolling(res.id);
            // We don't close the modal yet if user wants to see processing status, 
            // but usually we can close it and let them see it in the list.
            // For now, let's toast and close.
            toast.success("Video upload started!");
            onClose();
            resetForm();
            return;
          }
        }
      } else if (contentType === "document" && file) {
        payload.append("content", link); // If link provided
        payload.append("file_content", file);
      } else if (contentType === "assignment") {
        payload.append("assignment_details", JSON.stringify(assignmentData));
      } else if (contentType === "quiz") {
        // Step 1: Create the Lesson record
        const res = await createLesson({ 
          course_pk: courseId, 
          module_pk: moduleId, 
          body: { 
            title, 
            content_type: "quiz",
            duration_in_minutes: duration || 0,
            is_preview: isPreview,
            is_released: isReleased
          } 
        }).unwrap();

        // Step 2: Create and link the Quiz details
        if (res.id) {
          const quizPayload = mapQuizDataToBackend(quizData, title);
          await createQuiz({
            course_pk: courseId,
            module_pk: moduleId,
            lesson_pk: res.id,
            body: quizPayload
          }).unwrap();
        }
        
        toast.success("Quiz lesson created successfully!");
        onClose();
        resetForm();
        return;
      } else if (contentType === "assignment") {
        // Step 1: Create the Lesson record
        const res = await createLesson({ 
          course_pk: courseId, 
          module_pk: moduleId, 
          body: { 
            title, 
            content_type: "assignment",
            duration_in_minutes: duration || 0,
            is_preview: isPreview,
            is_released: isReleased
          } 
        }).unwrap();

        // Step 2: Create and link the Assignment details
        if (res.id) {
          const assignmentPayload = mapAssignmentDataToBackend(assignmentData);
          await createAssignment({
            course_pk: courseId,
            module_pk: moduleId,
            lesson_pk: res.id,
            body: assignmentPayload
          }).unwrap();
        }
        
        toast.success("Assignment lesson created successfully!");
        onClose();
        resetForm();
        return;
      }

      payload.append("duration_in_minutes", duration || 0);
      payload.append("is_preview", isPreview);
      payload.append("is_released", isReleased);

      await createLesson({ 
        course_pk: courseId, 
        module_pk: moduleId, 
        body: payload 
      }).unwrap();

      toast.success("Lesson added successfully");
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.detail || "Failed to add lesson");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContentType("video");
    setLink("");
    setFile(null);
    setLiveDate("");
    setLiveTime("");
    setDuration("");
    setIsPreview(false);
    setIsReleased(true);
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
    setVideoStatus(null);
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
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
          {/* Status Alert for processing video */}
          {videoStatus && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 ${
              videoStatus === 'ready' ? 'bg-green-50 text-green-700' : 
              videoStatus === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {videoStatus === 'processing' || videoStatus === 'uploading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : videoStatus === 'ready' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-bold">
                {videoStatus === 'uploading' && "Uploading video file..."}
                {videoStatus === 'processing' && "Video is processing. This may take a few minutes."}
                {videoStatus === 'ready' && "Video is ready and available for students."}
                {videoStatus === 'error' && "There was an error processing your video."}
              </span>
            </div>
          )}

          {/* Lesson Title & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${(contentType === "video" || contentType === "live" || contentType === "external_link") ? "md:col-span-2" : "md:col-span-3"} space-y-3`}>
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
            {(contentType === "video" || contentType === "live" || contentType === "external_link") && (
              <div className="space-y-3 animate-in slide-in-from-right-4 duration-300">
                <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 45"
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
                />
              </div>
            )}
          </div>

          {/* Visibility & Preview Settings */}
          <div className="flex flex-wrap gap-6 bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isReleased}
                  onChange={(e) => setIsReleased(e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-12 h-6 bg-stone-200 rounded-full peer-checked:bg-teal-500 transition-all shadow-inner"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6 shadow-sm"></div>
              </div>
              <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors">
                Available to Students (Released)
              </span>
            </label>

            {/* Show Free Preview only for compatible types */}
            {(contentType === "video" || contentType === "document" || contentType === "external_link") && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isPreview}
                    onChange={(e) => setIsPreview(e.target.checked)}
                    className="peer hidden"
                  />
                  <div className="w-12 h-6 bg-stone-200 rounded-full peer-checked:bg-amber-500 transition-all shadow-inner"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6 shadow-sm"></div>
                </div>
                <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors">
                  Free Preview
                </span>
              </label>
            )}
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
              Content Type
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
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
                  <span className="text-[10px] sm:text-xs font-bold arimo-font whitespace-nowrap">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Type-Specific Fields */}
          {contentType === "external_link" && (
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                External URL
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/resource"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-blue-600 inter-font"
              />
            </div>
          )}

          {contentType === "live" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                  Session Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={liveDate}
                    onChange={(e) => setLiveDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
                  />
                  <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-stone-700 ml-1 inter-font">
                  Session Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={liveTime}
                    onChange={(e) => setLiveTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold text-stone-800 inter-font"
                  />
                  <Clock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {contentType === "assignment" ? (
            <AssignmentForm
              data={assignmentData}
              onChange={setAssignmentData}
            />
          ) : contentType === "quiz" ? (
            <QuizForm data={quizData} onChange={setQuizData} />
          ) : contentType !== "external_link" && contentType !== "live" ? (
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
                  accept={contentType === "video" ? "video/*" : ".pdf,.doc,.docx"}
                  className="hidden"
                />
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-transform mb-4 shadow-sm border border-stone-100 group-hover:border-teal-100">
                    <UploadCloud className="w-8 h-8 text-stone-400 group-hover:text-teal-500 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-stone-900 font-bold arimo-font">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </h4>
                    <p className="text-stone-400 text-sm font-medium inter-font">
                      {contentType === "video"
                        ? "MP4, MOV (max 500MB)"
                        : "PDF, DOCX (max 10MB)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
            disabled={isUploading}
            className="px-8 py-3 bg-greenTeal hover:bg-teal-700 text-white rounded-xl font-black shadow-lg shadow-teal-900/10 active:scale-95 transition-all arimo-font flex items-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Working...</span>
              </>
            ) : (
              <>
                <span>Add Lesson</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
