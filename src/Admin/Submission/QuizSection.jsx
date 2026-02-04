import React, { useState } from "react";
import {
  FileText,
  User,
  Calendar,
  Award,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
// Important: Ensure we are importing the Quiz-specific modal
import QuizDetailsModal from "./QuizDetailsModal";

/**
 * QuizSection component to display student quiz submissions.
 */
const QuizSection = ({ categories, submissions }) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuizSubmission, setSelectedQuizSubmission] = useState(null);

  const handleOpenQuizDetails = (submission) => {
    setSelectedQuizSubmission(submission);
    setIsQuizModalOpen(true);
  };

  return (
    <div className="space-y-10">
      {categories.map((title, catIdx) => (
        <div key={catIdx} className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-purple-100 rounded-[10px] flex items-center justify-center">
              <FileText className="w-7 h-7 text-purple-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-[28px] font-bold text-neutral-800 leading-[28px]">
              {title}
            </h2>
          </div>

          {/* Submission Cards */}
          <div className="space-y-4">
            {submissions
              .filter((s) => s.assignmentTitle === title)
              .map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex-1 space-y-5">
                    {/* Tags */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-1 rounded-[32px] text-xs font-bold inline-flex items-center gap-1.5 border ${submission.status === "Passed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                          }`}
                      >
                        {submission.status === "Passed" ? (
                          <CheckCircle2
                            className="w-3.5 h-3.5"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                        )}
                        {submission.status}
                      </div>
                      <div className="px-4 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-[32px] text-xs font-bold">
                        Quiz
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Student Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">
                            {submission.studentName}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {submission.email}
                          </p>
                        </div>
                      </div>

                      {/* Submission Date */}
                      <div className="flex items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">
                            {submission.date}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {submission.time}
                          </p>
                        </div>
                      </div>

                      {/* Grade Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                          <Award className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-800">
                            {submission.score}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {submission.percentage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleOpenQuizDetails(submission)}
                      className="flex-1 md:flex-none px-6 py-2.5 rounded-[10px] border border-slate-300 text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4 stroke-[1.5]" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Explicity using QuizDetailsModal here */}
      <QuizDetailsModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        submission={selectedQuizSubmission}
      />
    </div>
  );
};

export default QuizSection;
