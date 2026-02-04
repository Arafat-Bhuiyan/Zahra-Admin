import React from "react";
import { X, CheckCircle2, XCircle } from "lucide-react";

/**
 * QuizDetailsModal component to show detailed results of a student's quiz submission.
 * Matches the uploaded design with Student Info, Score Card, and Answers Review.
 */
const QuizDetailsModal = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  const isPassed = submission.status === "Passed";

  // Mock questions if submission doesn't have them (fallback)
  const displayQuestions = submission.questions || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-[880px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header - Teal Gradient matching design */}
        <div className="px-10 py-8 bg-[#7AA4A5] text-white flex justify-between items-start relative overflow-hidden">
          <div className="relative z-10 transition-all duration-300">
            <h2 className="text-[28px] font-bold font-['Arimo'] mb-1 tracking-tight leading-tight">
              STUDENT QUIZ RESULT
            </h2>
            <p className="text-white/80 text-lg font-normal font-['Arimo'] uppercase tracking-widest">
              Quiz: {submission.assignmentTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group active:scale-95 z-10"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>
          {/* Subtle background pattern could go here */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
          {/* Student Information - Light Grey Box */}
          <div className="p-8 bg-[#FAFAFA] rounded-2xl border border-neutral-100 shadow-sm">
            <h3 className="text-[20px] font-bold text-neutral-800 font-['Arimo'] mb-6">
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1.5">
                <p className="text-sm font-normal text-neutral-400 font-['Arimo']">
                  Student Name
                </p>
                <p className="text-base font-semibold text-neutral-800 font-['Arimo']">
                  {submission.studentName}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-normal text-neutral-400 font-['Arimo']">
                  Email
                </p>
                <p className="text-base font-medium text-neutral-800 font-['Arimo']">
                  {submission.email}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-normal text-neutral-400 font-['Arimo']">
                  Submitted Date
                </p>
                <p className="text-base font-medium text-neutral-800 font-['Arimo']">
                  {submission.date} at {submission.time}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-normal text-neutral-400 font-['Arimo']">
                  Time Spent
                </p>
                <p className="text-base font-medium text-neutral-800 font-['Arimo']">
                  {submission.timeSpent || "20 minutes"}
                </p>
              </div>
            </div>
          </div>

          {/* Total Score Card - Green/Red conditional styling */}
          <div
            className={`p-10 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 ${isPassed
              ? "bg-[#F3FAF5] border-[#D1EBD9]"
              : "bg-[#FFF8F8] border-[#FEE2E2]"
              }`}
          >
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-500 font-['Arimo'] uppercase tracking-wider">
                Total Score
              </p>
              <h4 className="text-[48px] font-extrabold text-neutral-800 font-['Arimo'] leading-none">
                {submission.score.split(" ")[0]}
              </h4>
              <p
                className={`text-[22px] font-bold font-['Arimo'] mt-1 ${isPassed ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
              >
                {submission.percentage} - {submission.status}
              </p>
            </div>
            <div
              className={`flex items-center justify-center p-2 transition-transform duration-500 hover:scale-110 ${isPassed ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
            >
              {isPassed ? (
                <div className="p-4 bg-white rounded-full shadow-lg border border-[#D1EBD9]">
                  <CheckCircle2 className="w-20 h-20 stroke-[1.5]" />
                </div>
              ) : (
                <div className="p-4 bg-white rounded-full shadow-lg border border-[#FEE2E2]">
                  <XCircle className="w-20 h-20 stroke-[1.5]" />
                </div>
              )}
            </div>
          </div>

          {/* Answers Review Section */}
          <div className="space-y-6 pt-2">
            <h3 className="text-[20px] font-bold text-neutral-800 font-['Arimo']">
              Answers Review
            </h3>
            <div className="space-y-5">
              {displayQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${q.isCorrect
                    ? "bg-[#F3FAF5] border-[#D1EBD9]"
                    : "bg-[#FFF8F8] border-[#FEE2E2]"
                    }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-neutral-500 font-['Arimo'] uppercase tracking-wide">
                          Question {q.id}
                        </span>
                        {q.isCorrect ? (
                          <div className="bg-[#10B981] rounded-full p-0.5">
                            <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="bg-[#EF4444] rounded-full p-0.5">
                            <XCircle className="w-4 h-4 text-white stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[17px] font-bold text-neutral-800 font-['Arimo'] leading-snug">
                        {q.text}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-neutral-800 font-['Arimo'] bg-white px-3 py-1 rounded-lg border border-neutral-100 shadow-sm whitespace-nowrap">
                      {q.points} pts
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-[15px] font-medium">
                      <span className="text-neutral-500 font-['Arimo'] min-w-[120px]">
                        Student Answer:
                      </span>
                      <span className="text-neutral-700 font-['Arimo']">
                        {q.studentAnswer}
                      </span>
                    </div>
                    {!q.isCorrect && (
                      <div className="flex items-start gap-2 text-[15px] font-bold">
                        <span className="text-[#10B981] font-['Arimo'] min-w-[120px]">
                          Correct Answer:
                        </span>
                        <span className="text-[#10B981] font-['Arimo']">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-7 bg-white border-t border-neutral-100 flex items-center">
          <button
            onClick={onClose}
            className="px-10 py-3 border border-neutral-300 rounded-xl text-neutral-600 text-base font-bold hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsModal;
