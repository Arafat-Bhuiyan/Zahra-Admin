"use client";

import { useState } from "react";
import { Eye, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import SubmissionsHeader from "../components/SubmissionsHeader";
import AssignmentDetailsModal from "../components/Modal/AssignmentDetailsModal";
import GradeAssignmentModal from "../components/Modal/GradeAssignmentModal";

export default function Submissions() {
  const [submissionType, setSubmissionType] = useState("assignment");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' | 'grade' | null

  const openDetails = (submission) => {
    setSelectedSubmission(submission);
    setModalType("details");
  };

  const openGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setModalType("grade");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedSubmission(null);
  };

  // Assignment Data
  const assignmentData = [
    {
      id: 1,
      number: "01",
      title: "Assignment Title Here",
      submissions: [
        {
          id: 1,
          studentName: "Ahmed Hassan",
          studentEmail: "ahmed@email.com",
          status: "Graded",
          statusColor: "bg-green-100 text-green-700",
          submissionDate: "Jan 12, 2026",
          submissionTime: "04:45 PM",
          points: "45/50",
          percentage: "90%",
          assignmentTitle: "01 Assignment Title Here",
          courseName: "Advanced React Patterns",
          submittedDate: "Jan 12, 2026 at 04:45 PM",
          studentComments:
            "I have attached the required files and implemented the hook as described. Please review and provide feedback.",
          files: [
            { name: "useFetch.js", size: "2.4 KB" },
            { name: "example.jsx", size: "1.8 KB" },
          ],
          currentScore: 45,
        },
        {
          id: 2,
          studentName: "Ahmed Hassan",
          studentEmail: "ahmed@email.com",
          status: "Pending Review",
          statusColor: "bg-yellow-100 text-yellow-700",
          submissionDate: "Jan 12, 2026",
          submissionTime: "04:45 PM",
          points: "45/50",
          percentage: "90%",
          assignmentTitle: "01 Assignment Title Here",
          courseName: "Advanced React Patterns",
          submittedDate: "Jan 12, 2026 at 04:45 PM",
          studentComments:
            "Working on final touches — submitting early for feedback.",
          files: [{ name: "solution.js", size: "3.1 KB" }],
          currentScore: 0,
        },
      ],
    },
    {
      id: 2,
      number: "02",
      title: "Assignment Title Here",
      submissions: [
        {
          id: 1,
          studentName: "Ahmed Hassan",
          studentEmail: "ahmed@email.com",
          status: "Graded",
          statusColor: "bg-green-100 text-green-700",
          submissionDate: "Jan 12, 2026",
          submissionTime: "04:45 PM",
          points: "45/50",
          percentage: "90%",
          assignmentTitle: "02 Assignment Title Here",
          courseName: "Advanced React Patterns",
          submittedDate: "Jan 12, 2026 at 04:45 PM",
          studentComments: "Please see my answers attached.",
          files: [{ name: "answers.pdf", size: "12.3 KB" }],
          currentScore: 48,
        },
        {
          id: 2,
          studentName: "Ahmed Hassan",
          studentEmail: "ahmed@email.com",
          status: "Graded",
          statusColor: "bg-green-100 text-green-700",
          submissionDate: "Jan 12, 2026",
          submissionTime: "04:45 PM",
          points: "45/50",
          percentage: "90%",
          assignmentTitle: "02 Assignment Title Here",
          courseName: "Advanced React Patterns",
          submittedDate: "Jan 12, 2026 at 04:45 PM",
          studentComments: "Attached my implementation.",
          files: [],
          currentScore: 42,
        },
      ],
    },
  ];

  // Quiz Data
  const quizData = [
    {
      id: 1,
      number: "01",
      title: "Quiz Title Here",
      submissions: [
        {
          id: 1,
          studentName: "Emily Rodriguez",
          studentEmail: "emily@email.com",
          status: "Failed",
          statusColor: "bg-red-100 text-red-700",
          submissionDate: "Jan 14, 2026",
          submissionTime: "12:30 AM",
          points: "20/30",
          percentage: "67%",
        },
        {
          id: 2,
          studentName: "Emily Rodriguez",
          studentEmail: "emily@email.com",
          status: "Passed",
          statusColor: "bg-green-100 text-green-700",
          submissionDate: "Jan 14, 2026",
          submissionTime: "12:30 AM",
          points: "29/30",
          percentage: "97%",
        },
        {
          id: 3,
          studentName: "Emily Rodriguez",
          studentEmail: "emily@email.com",
          status: "Passed",
          statusColor: "bg-green-100 text-green-700",
          submissionDate: "Jan 14, 2026",
          submissionTime: "12:30 AM",
          points: "29/30",
          percentage: "97%",
        },
      ],
    },
  ];

  const currentData =
    submissionType === "assignment" ? assignmentData : quizData;

  return (
    <div className="min-h-screen bg-gray-50">
      <SubmissionsHeader
        onTypeChange={setSubmissionType}
        onSearchChange={setSearchQuery}
        onCourseChange={setSelectedCourse}
        onModuleChange={setSelectedModule}
      />

      <div className="p-8">
        {/* Course Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Advanced React Patterns
        </h1>
        {submissionType === "quiz" && (
          <p className="text-sm text-gray-600 mb-8">
            Instructor: Dr. Sarah Johnson
          </p>
        )}

        {/* Submissions List */}
        <div className="space-y-8">
          {currentData.map((section) => (
            <div key={section.id}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${submissionType === "assignment" ? "bg-orange-100" : "bg-purple-100"}`}
                >
                  <FileText
                    className={`w-6 h-6 ${submissionType === "assignment" ? "text-orange-600" : "text-purple-600"}`}
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {section.number}{" "}
                  {submissionType === "assignment" ? "Assignment" : "Quiz"}{" "}
                  Title Here
                </h2>
              </div>

              {/* Submissions */}
              <div className="space-y-4">
                {section.submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    {/* Left Content */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Status Badge */}
                      <div className="pt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${submission.statusColor}`}
                        >
                          {submission.status}
                        </span>
                      </div>

                      {/* Submission Details */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {submission.studentName}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          {submission.studentEmail}
                        </p>

                        {/* Date and Points */}
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">📅</span>
                            <span>{submission.submissionDate}</span>
                            <span className="text-gray-400">
                              {submission.submissionTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">⭐</span>
                            <span>{submission.points}</span>
                            <span className="text-gray-400">
                              ({submission.percentage})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openDetails(submission)}
                        className="flex items-center gap-2 px-3 py-2 text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>

                      {submissionType === "assignment" && (
                        <button
                          onClick={() => openGradeModal(submission)}
                          className="flex items-center gap-2 px-3 py-2 text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
                        >
                          Edit Grade
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalType === "details" && (
        <AssignmentDetailsModal
          submission={selectedSubmission}
          onClose={closeModal}
          onGrade={openGradeModal}
        />
      )}

      {modalType === "grade" && (
        <GradeAssignmentModal
          submission={selectedSubmission}
          onClose={closeModal}
          totalPoints={50}
        />
      )}
    </div>
  );
}
