import React from "react";
import { X, FileText, Download, CheckCircle2 } from "lucide-react";

const AssignmentDetailsModal = ({ isOpen, onClose, submission, onGrade }) => {
  if (!isOpen || !submission) return null;

  const isGraded = submission.status === "Graded";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[881px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[#7AA4A5] to-[#8eb3b4] text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold font-['Arimo'] mb-1">
              {submission.assignmentTitle || "Assignment Title Here"}
            </h2>
            <p className="text-white/90 text-base font-normal font-['Arimo']">
              Advanced React Patterns
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Student Information */}
          <div className="p-6 bg-neutral-50 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-neutral-800 font-['Arimo']">
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-normal text-neutral-500 font-['Arimo'] mb-1">
                  Student Name
                </p>
                <p className="text-sm font-medium text-neutral-800 font-['Arimo']">
                  {submission.studentName}
                </p>
              </div>
              <div>
                <p className="text-sm font-normal text-neutral-500 font-['Arimo'] mb-1">
                  Email
                </p>
                <p className="text-sm font-medium text-neutral-800 font-['Arimo']">
                  {submission.email}
                </p>
              </div>
              <div>
                <p className="text-sm font-normal text-neutral-500 font-['Arimo'] mb-1">
                  Submitted Date
                </p>
                <p className="text-sm font-medium text-neutral-800 font-['Arimo']">
                  {submission.date} at {submission.time}
                </p>
              </div>
            </div>
          </div>

          {/* Student Comments */}
          <div className="p-6 bg-neutral-50 rounded-xl space-y-3">
            <h3 className="text-lg font-bold text-neutral-800 font-['Arimo']">
              Student Comments
            </h3>
            <p className="text-sm font-normal text-neutral-700 leading-relaxed font-['Arimo']">
              {submission.comments ||
                "I have created a custom useFetch hook that handles loading states, error handling, and automatic retries. The hook accepts a URL and optional configuration. Please find the implementation and example usage in the attached files."}
            </p>
          </div>

          {/* Submitted Files */}
          <div className="p-6 bg-neutral-50 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7AA4A5]" />
              <h3 className="text-lg font-bold text-neutral-800 font-['Arimo']">
                Submitted Files (2)
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { name: "useFetch.js", size: "2.4 KB", type: "JS" },
                { name: "example.jsx", size: "1.8 KB", type: "JSX" },
              ].map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl hover:border-[#7AA4A5] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#7AA4A5]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#7AA4A5]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {file.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {file.size} • {file.type}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-neutral-400 hover:text-[#7AA4A5] transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-8 py-2.5 border border-neutral-300 rounded-xl text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
          >
            Close
          </button>

          <button
            onClick={onGrade}
            className="px-8 py-2.5 bg-[#7AA4A5] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#6b9192] transition-colors shadow-lg shadow-[#7AA4A5]/20"
          >
            <CheckCircle2 className="w-5 h-5" />
            {isGraded ? "Edit Grade" : "Grade Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsModal;
