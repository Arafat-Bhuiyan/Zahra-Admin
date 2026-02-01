import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import AssignmentSection from "./AssignmentSection";
import QuizSection from "./QuizSection";

/**
 * Submission component for admin to view and manage student assignment and quiz submissions.
 * Matches Figma design with search, filters, and conditional rendering of sections.
 */
const Submission = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Assignment");

  // Mock data for assignments
  const assignmentSubmissions = [
    {
      id: 1,
      studentName: "Ahmed Hassan",
      email: "ahmed.h@email.com",
      date: "Jan 12, 2026",
      time: "04:45 PM",
      score: "45/50 pts",
      percentage: "90%",
      status: "Graded",
      type: "Assignment",
      assignmentTitle: "01 Assignment Title Here",
    },
    {
      id: 2,
      studentName: "Ahmed Hassan",
      email: "ahmed.h@email.com",
      date: "Jan 12, 2026",
      time: "04:45 PM",
      score: "45/50 pts",
      percentage: "90%",
      status: "Pending Review",
      type: "Assignment",
      assignmentTitle: "01 Assignment Title Here",
    },
    {
      id: 3,
      studentName: "Ahmed Hassan",
      email: "ahmed.h@email.com",
      date: "Jan 12, 2026",
      time: "04:45 PM",
      score: "45/50 pts",
      percentage: "90%",
      status: "Graded",
      type: "Assignment",
      assignmentTitle: "02 Assignment Title Here",
    },
  ];

  // Mock data for quizzes
  const quizSubmissions = [
    {
      id: 1,
      studentName: "Emily Rodriguez",
      email: "emily.r@email.com",
      date: "Jan 14, 2026",
      time: "10:30 AM",
      score: "20/30 pts",
      percentage: "67%",
      status: "Failed",
      type: "Quiz",
      assignmentTitle: "01 Quiz Title Here", // Reusing field for convenience
    },
    {
      id: 2,
      studentName: "Emily Rodriguez",
      email: "emily.r@email.com",
      date: "Jan 14, 2026",
      time: "10:30 AM",
      score: "28/30 pts",
      percentage: "93%",
      status: "Passed",
      type: "Quiz",
      assignmentTitle: "01 Quiz Title Here",
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
            <select className="px-4 py-2.5 w-[160px] rounded-[10px] border border-neutral-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none pr-10 text-neutral-950/50">
              <option>Select course</option>
              <option>Advanced React Patterns</option>
              <option>Data Science Fundamentals</option>
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

          <div className="relative">
            <select className="px-4 py-2.5 w-[160px] rounded-[10px] border border-neutral-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none pr-10 text-neutral-950/50">
              <option>Select Module</option>
              <option>Module 01</option>
              <option>Module 02</option>
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

          <div className="relative">
            <select
              className="px-4 py-2.5 w-[140px] rounded-[10px] border border-neutral-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none pr-10 text-neutral-950/50"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Assignment">Assignment</option>
              <option value="Quiz">Quiz</option>
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

      {/* Course Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-neutral-800 leading-[32px]">
          Advanced React Patterns
        </h1>
        <p className="text-sm text-neutral-500 mt-2">
          Instructor: Dr. Sarah Johnson
        </p>
      </div>

      {/* Conditional Rendering of Sections */}
      {selectedType === "Assignment" ? (
        <AssignmentSection
          categories={assignmentCategories}
          submissions={filteredAssignments}
        />
      ) : (
        <QuizSection
          categories={quizCategories}
          submissions={filteredQuizzes}
        />
      )}
    </div>
  );
};

export default Submission;
