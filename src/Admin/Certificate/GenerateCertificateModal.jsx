import React, { useState } from "react";
import { X, Check } from "lucide-react";

const GenerateCertificateModal = ({
  isOpen,
  onClose,
  selectedStudents,
  onGenerate,
}) => {
  const [title, setTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleGenerate = () => {
    if (!title || !issueDate) {
      return;
    }
    onGenerate({ title, issueDate, expiryDate });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-400 to-slate-500 px-6 py-5 border-b border-neutral-200 flex justify-between items-center shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-white text-2xl font-bold arimo-font leading-8">
              Generate Certificates
            </h2>
            <p className="text-white/90 text-base font-normal arimo-font leading-6">
              Creating certificates for {selectedStudents.length} student(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-[10px] hover:bg-white/10 transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Certificate Title */}
          <div className="flex flex-col gap-2">
            <label className="text-neutral-700 text-sm font-normal arimo-font flex items-center gap-1">
              Certificate Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Advanced React Patterns"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-300 focus:outline-2 focus:outline-blue-500 font-arimo text-neutral-800 placeholder:text-neutral-400/50"
            />
          </div>

          {/* Dates */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-neutral-700 text-sm font-normal arimo-font flex items-center gap-1">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[10px] border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-neutral-500 text-sm font-normal arimo-font">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[10px] border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800"
              />
            </div>
          </div>

          {/* Selected Students */}
          <div className="p-4 bg-neutral-50 rounded-[10px] border border-neutral-200 flex flex-col gap-3">
            <h3 className="text-neutral-700 text-sm font-bold arimo-font">
              Selected Students ({selectedStudents.length})
            </h3>
            <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-2 custom-scrollbar">
              {selectedStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-100 border border-green-600 flex items-center justify-center shrink-0">
                    <Check
                      className="text-green-600"
                      size={10}
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-neutral-800 font-normal arimo-font truncate">
                    {student.name}
                  </span>
                  <span className="text-neutral-500 font-normal arimo-font truncate">
                    ({student.email})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex justify-between items-center shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[10px] border border-neutral-300 text-neutral-700 font-normal hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!title || !issueDate}
            className={`px-6 py-2.5 rounded-[10px] text-white font-bold flex items-center gap-2 transition-colors ${
              !title || !issueDate
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-slate-400 hover:bg-slate-500"
            }`}
          >
            {/* Icon from design */}
            <div className="relative w-5 h-5">
              {/* Simple CSS representation or SVG for the distinct icon in design if generic Award isn't close enough. 
                     Design has a badge-like icon. I'll use Lucide Award for simplicity as it matches the previous button. 
                 */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12.5C12.0711 12.5 13.75 10.8211 13.75 8.75C13.75 6.67893 12.0711 5 10 5C7.92893 5 6.25 6.67893 6.25 8.75C6.25 10.8211 7.92893 12.5 10 12.5Z"
                  stroke="white"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.25 10V15.8333L10 13.3333L13.75 15.8333V10"
                  stroke="white"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            Generate Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificateModal;
