import React, { useState } from "react";
import {
  Search,
  Filter,
  BookOpen,
  User,
  Calendar,
  Award,
  Eye,
  Edit3,
  CheckCircle2,
  Clock,
} from "lucide-react";

/**
 * Submission component for admin to view and manage student assignment submissions.
 * Matches Figma design with search, filters, and submission cards.
 */
const Submission = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for submissions
  const submissions = [
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
    {
      id: 4,
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

  // Grouping submissions by assignment title for the UI structure
  const categories = [...new Set(submissions.map((s) => s.assignmentTitle))];

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
            <select className="px-4 py-2.5 w-[140px] rounded-[10px] border border-neutral-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none pr-10 text-neutral-950/50">
              <option>Assignment</option>
              <option>Quiz</option>
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

      {/* Assignment Sections */}
      <div className="space-y-10">
        {categories.map((title, catIdx) => (
          <div key={catIdx} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-orange-100 rounded-[10px] flex items-center justify-center">
                <BookOpen
                  className="w-7 h-7 text-orange-600"
                  strokeWidth={1.5}
                />
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
                          className={`px-4 py-1 rounded-[32px] text-xs font-bold inline-flex items-center gap-1.5 border ${
                            submission.status === "Graded"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          {submission.status === "Graded" ? (
                            <CheckCircle2
                              className="w-3.5 h-3.5"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                          )}
                          {submission.status}
                        </div>
                        <div className="px-4 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-[32px] text-xs font-bold">
                          {submission.type}
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
                      <button className="flex-1 md:flex-none px-6 py-2.5 rounded-[10px] border border-slate-300 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 stroke-[1.5]" />
                        <span>View Details</span>
                      </button>

                      {submission.status === "Graded" ? (
                        <button className="flex-1 md:flex-none px-6 py-2.5 rounded-[10px] border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                          <Edit3 className="w-4 h-4 stroke-[1.5]" />
                          Edit Grade
                        </button>
                      ) : (
                        <button className="flex-1 md:flex-none px-6 py-2.5 rounded-[10px] bg-[#7AA4A5] text-white text-sm font-medium hover:bg-[#6b9192] transition-colors flex items-center justify-center gap-2 shadow-sm">
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                          Grade Now
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
  );
};

export default Submission;
