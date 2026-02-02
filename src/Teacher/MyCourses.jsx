"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, X } from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [
    "All",
    "Mental Health",
    "Spiritual Growth",
    "Relationships",
    "Professional",
  ];
  const statuses = ["All", "Live", "Recorded", "Upcoming"];

  const courses = [
    {
      id: 1,
      title: "Tafair Al-Quran: Understanding D...",
      instructor: "Dr. Ahmed Hassan",
      category: "Spiritual Growth",
      status: "Upcoming",
      statusColor: "bg-green-100 text-green-800",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: "/images/image.png",
      description:
        "Learn the fundamentals of Quranic interpretation with expert guidance from Dr. Ahmed Hassan. This comprehensive course covers essential concepts and methodologies.",
      level: "Beginner",
      startDate: "Jan 15, 2026",
    },
    {
      id: 2,
      title: "Tafair Al-Quran: Understanding D...",
      instructor: "Dr. Ahmed Hassan",
      category: "Spiritual Growth",
      status: "Live",
      statusColor: "bg-red-100 text-red-800",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: "/images/image.png",
      description:
        "Join our live Quranic interpretation sessions. Interactive learning with real-time Q&A opportunities.",
      level: "Intermediate",
      startDate: "Jan 10, 2026",
    },
    {
      id: 3,
      title: "Tafair Al-Quran: Understanding D...",
      instructor: "Dr. Ahmed Hassan",
      category: "Spiritual Growth",
      status: "Recorded",
      statusColor: "bg-teal-100 text-teal-800",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: "/images/image.png",
      description:
        "Access recorded sessions of our Quranic interpretation course. Learn at your own pace with lifetime access.",
      level: "Advanced",
      startDate: "Dec 20, 2025",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "All" || course.category === selectedCategory;
    const statusMatch =
      selectedStatus === "All" || course.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const handleCardClick = (course) => {
    // Only navigate to details page if course status is NOT "Live"
    if (course.status !== "Live") {
      navigate(`/teacher/course/${course.id}`, { state: { course } });
    }
  };

  const isCardClickable = (course) => course.status !== "Live";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* View-Only Access Alert */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-blue-900">View-Only Access</p>
            <p className="text-sm text-blue-800">
              You can view course content and student progress, but cannot edit
              materials or upload content. Contact the admin for any course
              updates needed.
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Assigned Courses
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Category Filter */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCardClick(course)}
              className={`bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow ${
                isCardClickable(course)
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${course.statusColor}`}
                >
                  {course.status}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  {course.instructor}
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 000-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
                    </svg>
                    {course.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {course.weeks} weeks
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {course.totalHours} hr
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {course.perSession} per session
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-teal-600">
                    {course.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Quick Details"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No courses found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Course Details Modal - Eye Button */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full overflow-y-auto">
            <div className="p-6 flex items-center justify-between border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Course Details
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Course Name
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Instructor
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.instructor}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Status
                    </p>
                    <p
                      className={`text-sm font-semibold px-2 py-1 rounded w-fit ${selectedCourse.statusColor}`}
                    >
                      {selectedCourse.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.weeks} weeks
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Price
                    </p>
                    <p className="text-sm font-semibold text-teal-600">
                      {selectedCourse.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Category
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Level
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.level}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Start Date
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedCourse.startDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Description
                </p>
                <p className="text-sm text-gray-700">
                  {selectedCourse.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  navigate(`/teacher/course/${selectedCourse.id}`, {
                    state: { course: selectedCourse },
                  });
                }}
                className="flex-1 px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors"
              >
                View Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
