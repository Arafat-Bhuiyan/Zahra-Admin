import React from "react";
import { X, CheckCircle2, XCircle, Clock } from "lucide-react";

const QuizDetailsModal = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  const isPassed = submission.status === "Passed";

  // Mock questions based on the status for demonstration
  const mockQuestions = isPassed
    ? [
        {
          id: 1,
          text: "What is a list in Python?",
          studentAnswer: "Option 1",
          points: "10/10",
          isCorrect: true,
        },
        {
          id: 2,
          text: "How do you define a function?",
          studentAnswer: "Option 2",
          points: "10/10",
          isCorrect: true,
        },
      ]
    : [
        {
          id: 1,
          text: "What does useState return?",
          studentAnswer: "Option 2",
          points: "10/10",
          isCorrect: true,
        },
        {
          id: 2,
          text: "When does useEffect run by default?",
          studentAnswer: "Option 2",
          points: "10/10",
          isCorrect: true,
        },
        {
          id: 3,
          text: "Which hook is used for side effects?",
          studentAnswer: "Option 3",
          correctAnswer: "Option 1",
          points: "0/10",
          isCorrect: false,
        },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[881px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[#7AA4A5] to-[#8eb3b4] text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold font-['Arimo'] mb-1">
              Quiz Title
            </h2>
            <p className="text-white/90 text-base font-normal font-['Arimo']">
              {submission.assignmentTitle === "01 Quiz Title Here"
                ? "Advanced React Patterns"
                : "Data Science Fundamentals"}
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
              <div>
                <p className="text-sm font-normal text-neutral-500 font-['Arimo'] mb-1">
                  Time Spent
                </p>
                <p className="text-sm font-medium text-neutral-800 font-['Arimo']">
                  {isPassed ? "25 minutes" : "18 minutes"}
                </p>
              </div>
            </div>
          </div>

          {/* Total Score Card */}
          <div
            className={`p-6 rounded-xl border flex items-center justify-between ${
              isPassed
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="space-y-1">
              <p className="text-sm font-normal text-neutral-600 font-['Arimo']">
                Total Score
              </p>
              <h4 className="text-3xl font-bold text-neutral-800 font-['Arimo']">
                {submission.score.replace(" pts", "")}
              </h4>
              <p
                className={`text-lg font-bold font-['Arimo'] ${isPassed ? "text-green-700" : "text-red-700"}`}
              >
                {submission.percentage} - {submission.status}
              </p>
            </div>
            <div
              className={`p-4 rounded-full ${isPassed ? "text-green-600" : "text-red-600"}`}
            >
              {isPassed ? (
                <CheckCircle2 className="w-16 h-16" strokeWidth={1.5} />
              ) : (
                <XCircle className="w-16 h-16" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* Answers Review */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-800 font-['Arimo']">
              Answers Review
            </h3>
            <div className="space-y-4">
              {(submission.questions || mockQuestions).map((q, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col gap-3 ${
                    q.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-600 font-['Arimo']">
                          Question {q.id}
                        </span>
                        {q.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-base font-normal text-neutral-800 font-['Arimo']">
                        {q.text}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-neutral-800 font-['Arimo'] whitespace-nowrap">
                      {q.points} pts
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex gap-2 text-sm font-normal">
                      <span className="text-neutral-600 font-['Arimo']">
                        Student Answer:
                      </span>
                      <span className="text-neutral-600 font-['Arimo']">
                        {q.studentAnswer}
                      </span>
                    </div>
                    {!q.isCorrect && (
                      <div className="flex gap-2 text-sm font-normal">
                        <span className="text-green-700 font-['Arimo'] font-bold">
                          Correct Answer:
                        </span>
                        <span className="text-green-700 font-['Arimo']">
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
        <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-200 flex items-center">
          <button
            onClick={onClose}
            className="px-8 py-2.5 border border-neutral-300 rounded-xl text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsModal;
