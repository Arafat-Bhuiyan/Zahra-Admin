import React from "react";
import {
  X,
  Video,
  FileText,
  HelpCircle,
  BookOpen,
  Clock,
  Target,
  FileDown,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const LessonDetailsModal = ({ lesson, isOpen, onClose }) => {
  if (!isOpen || !lesson) return null;

  const renderIcon = () => {
    switch (lesson.type) {
      case "video":
        return <Video className="w-8 h-8 text-blue-600" />;
      case "document":
        return <FileText className="w-8 h-8 text-amber-600" />;
      case "quiz":
        return <HelpCircle className="w-8 h-8 text-purple-600" />;
      case "assignment":
        return <BookOpen className="w-8 h-8 text-orange-600" />;
      default:
        return <FileText className="w-8 h-8 text-stone-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1.25rem] bg-stone-50 flex items-center justify-center">
              {renderIcon()}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 block mb-1 inter-font">
                Lesson Type: {lesson.type}
              </span>
              <h2 className="text-2xl font-black text-stone-800 arimo-font tracking-tight leading-none">
                {lesson.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-2xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Video / Document Details */}
          {(lesson.type === "video" || lesson.type === "document") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.link && (
                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Video URL</span>
                  </div>
                  <a
                    href={lesson.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-blue-700 hover:underline break-all truncate block"
                  >
                    {lesson.link}
                  </a>
                </div>
              )}
              {lesson.fileName && (
                <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Attached File</span>
                  </div>
                  <span className="text-sm font-bold text-amber-700 block truncate">
                    {lesson.fileName}
                  </span>
                </div>
              )}
              {lesson.duration && (
                <div className="p-5 bg-stone-50 border border-stone-100 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-stone-500 font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration</span>
                  </div>
                  <span className="text-sm font-black text-stone-800">
                    {lesson.duration}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Quiz Details */}
          {lesson.type === "quiz" && lesson.quiz && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-3xl text-center">
                  <Clock className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
                    Time Limit
                  </span>
                  <span className="text-lg font-black text-purple-700">
                    {lesson.quiz.timeLimit}m
                  </span>
                </div>
                <div className="p-5 bg-teal-50/50 border border-teal-100 rounded-3xl text-center">
                  <Target className="w-5 h-5 text-teal-600 mx-auto mb-2" />
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">
                    Passing
                  </span>
                  <span className="text-lg font-black text-teal-700">
                    {lesson.quiz.passingScore}%
                  </span>
                </div>
                <div className="p-5 bg-stone-50 border border-stone-100 rounded-3xl text-center">
                  <HelpCircle className="w-5 h-5 text-stone-600 mx-auto mb-2" />
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    Questions
                  </span>
                  <span className="text-lg font-black text-stone-800">
                    {lesson.quiz.questions?.length || 0}
                  </span>
                </div>
              </div>

              {lesson.quiz.description && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-stone-800 uppercase tracking-widest">
                    Quiz Description
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium">
                    {lesson.quiz.description}
                  </p>
                </div>
              )}

              {/* Mini Questions List */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-stone-800 uppercase tracking-widest">
                  Questions Overview
                </h4>
                <div className="space-y-3">
                  {lesson.quiz.questions?.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-6 h-6 rounded-lg bg-stone-200 flex items-center justify-center text-[10px] font-black">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-bold text-stone-700 truncate max-w-[300px]">
                          {q.text}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-stone-400 uppercase">
                        {q.points} Points
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assignment Details */}
          {lesson.type === "assignment" && lesson.assignment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-3xl">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-1">
                    Maximum Points
                  </span>
                  <span className="text-xl font-black text-orange-700">
                    {lesson.assignment.maxPoints} pts
                  </span>
                </div>
                <div className="p-5 bg-stone-50 border border-stone-100 rounded-3xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                    Due Date
                  </span>
                  <span className="text-xl font-black text-stone-800">
                    {lesson.assignment.dueDate || "No deadline"}
                  </span>
                </div>
              </div>

              {lesson.assignment.description && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-stone-800 uppercase tracking-widest">
                    Description
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium">
                    {lesson.assignment.description}
                  </p>
                </div>
              )}

              {lesson.assignment.instructions && (
                <div className="p-6 bg-stone-50 border border-stone-100 rounded-[2rem] space-y-3">
                  <h4 className="text-sm font-black text-stone-800 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Instructions
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                    {lesson.assignment.instructions}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-white border border-stone-200 hover:border-stone-300 text-stone-600 font-black rounded-2xl shadow-sm transition-all active:scale-95 inter-font uppercase tracking-widest text-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsModal;
