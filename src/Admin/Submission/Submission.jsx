import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import AssignmentSection from "./AssignmentSection";
import QuizSection from "./QuizSection";
import { useGetAssignmentSubmissionsQuery } from "../../Api/adminApi";

const Submission = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const queryParams = selectedStatus ? { status: selectedStatus } : {};

  const {
    data: assignmentSubmissionsData = [],
    isLoading: isAssignmentsLoading,
    isError: assignmentError,
  } = useGetAssignmentSubmissionsQuery(queryParams);

  const assignmentSubmissions = assignmentSubmissionsData.map((submission) => {
    const studentName =
      `${submission.user_detail?.first_name || ""} ${submission.user_detail?.last_name || ""}`.trim();
    const email = submission.user_detail?.email || "Unknown email";
    const createdAt = submission.created_at;
    const markValue = submission.mark != null ? Number(submission.mark) : null;
    const totalPoints = 50;

    const isGraded =
      markValue != null ||
      Boolean(submission.teacher_feedback) ||
      submission.status === "approved" ||
      submission.status === "rejected";

    return {
      id: submission.id,
      studentName: studentName || email,
      email,
      date: formatDate(createdAt),
      time: formatTime(createdAt),
      score:
        markValue != null && !Number.isNaN(markValue)
          ? `${markValue}/${totalPoints} pts`
          : "—",
      percentage:
        markValue != null && !Number.isNaN(markValue)
          ? `${Math.round((markValue / totalPoints) * 100)}%`
          : "Pending",
      status:
        submission.status === "pending"
          ? "Pending Review"
          : submission.status === "approved"
            ? "Approved"
            : submission.status === "rejected"
              ? "Rejected"
              : submission.status,
      type: "Assignment",
      assignmentTitle: submission.assignment_title || "Untitled Assignment",
      submissionText: submission.submission_text,
      submissionFile: submission.submission_file,
      teacherFeedback: submission.teacher_feedback,
      reviewedAt: submission.reviewed_at,
      isGraded,
      rawSubmission: submission,
    };
  });

  // Mock data for quizzes
  const quizSubmissions = [
    {
      id: 1,
      studentName: "Emily Rodriguez",
      email: "emily.r@email.com",
      date: "Jan 14, 2026",
      time: "10:30 AM",
      timeSpent: "18 minutes",
      score: "20/30 pts",
      percentage: "67%",
      status: "Failed",
      type: "Quiz",
      assignmentTitle: "01 Quiz Title Here",
      questions: [
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
      ],
    },
    {
      id: 2,
      studentName: "Sarah Chen",
      email: "sarah.chen@email.com",
      date: "Jan 13, 2026",
      time: "09:15 AM",
      timeSpent: "25 minutes",
      score: "20/20 pts",
      percentage: "100%",
      status: "Passed",
      type: "Quiz",
      assignmentTitle: "01 Quiz Title Here",
      questions: [
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
          studentAnswer: "Option 1",
          points: "10/10",
          isCorrect: true,
        },
      ],
    },
  ];

  // Filter submissions based on search term
  const filteredAssignments = assignmentSubmissions.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredQuizzes = quizSubmissions.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Grouping titles for UI categories based on filtered data
  const assignmentCategories = [
    ...new Set(filteredAssignments.map((s) => s.assignmentTitle)),
  ];
  const quizCategories = [
    ...new Set(filteredQuizzes.map((s) => s.assignmentTitle)),
  ];

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen arimo-font">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-neutral-200 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by student name or content title..."
            className="w-full pl-12 pr-4 py-2.5 rounded-[10px] border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-[10px] border border-neutral-300 hover:bg-neutral-50 transition-colors">
            <Filter className="w-5 h-5 text-neutral-500" />
          </button>

          <div className="relative">
            <select
              className="px-4 py-2.5 w-[180px] rounded-[10px] border border-neutral-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none pr-10 text-neutral-950/50"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-stone-500">
        {isAssignmentsLoading && "Loading assignment submissions..."}
        {assignmentError && (
          <span className="text-red-500">
            Unable to load assignment submissions. Please refresh.
          </span>
        )}
      </div>

      {/* Course Header */}
      {/* <div className="mb-8">
        <h1 className="text-[32px] font-bold text-neutral-800 leading-[32px]">
          Advanced React Patterns
        </h1>
        <p className="text-sm text-neutral-500 mt-2">
          Instructor: Dr. Sarah Johnson
        </p>
      </div> */}

      {/* Conditional Rendering of Sections */}
      <AssignmentSection
        categories={assignmentCategories}
        submissions={filteredAssignments}
      />
    </div>
  );
};

export default Submission;
