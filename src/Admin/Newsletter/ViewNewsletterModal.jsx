import React from "react";
import { X, ChevronLeft, Calendar, User } from "lucide-react";

const ViewNewsletterModal = ({ isOpen, onClose, newsletter }) => {
  if (!isOpen || !newsletter) return null;
  console.log("newsletter", newsletter);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[880px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] relative">
          <div className="flex justify-between items-center text-white">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all font-bold text-sm inter-font"
            >
              <ChevronLeft size={18} />
              Back to Newsletter
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30">
          {/* Status & Info Bar */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-neutral-800 inter-font">
                  {newsletter.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    newsletter.status === "sent"
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {newsletter.status}
                </span>
              </div>
              <p className="text-neutral-500 font-medium">
                Subject: {newsletter.subject}
              </p>
            </div>
            {newsletter.status === "sent" && (
              <div className="flex flex-col items-end text-sm text-neutral-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar size={14} />
                  <span>{newsletter.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <User size={14} />
                  <span>Admin Panel</span>
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm min-h-[400px]">
            <div className="prose prose-slate max-w-none">
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap text-lg">
                {newsletter.preview ||
                  newsletter.content ||
                  "No content available for this newsletter."}
                {"\n\n"}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                {"\n\n"}
                Features included:
                {"\n"}• Weekly progress reports
                {"\n"}• Expert mentorship sessions
                {"\n"}• Hands-on project portfolio
                {"\n\n"}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNewsletterModal;
