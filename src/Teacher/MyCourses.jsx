import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CalendarDays, Clock, Eye, Lock, X } from "lucide-react";
import featuredCourse1 from "../assets/img/featuredCourse1.png";
import featuredCourse2 from "../assets/img/featuredCourse2.png";
import featuredCourse3 from "../assets/img/featuredCourse3.png";
import { FaUserDoctor } from "react-icons/fa6";

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
      status: "Upcoming",
      category: "Mental Health",
      statusColor: "bg-[#5BB814] text-white",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: featuredCourse1,
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
      statusColor: "bg-[#D3130C] text-white",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: featuredCourse2,
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
      statusColor: "bg-[#2E9BDF] text-white",
      lessons: 24,
      weeks: 12,
      totalHours: 12,
      perSession: 20,
      price: "$99",
      image: featuredCourse3,
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
    navigate(`/teacher/course/${course.id}`, { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* View-Only Access Alert */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Lock className="text-sm text-[#155DFC]" />
          <div>
            <p className="font-bold text-[#1C398E]">View-Only Access</p>
            <p className="text-sm text-[#155DFC]">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedStatus === status
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
              className={
                "bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
              }
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
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/70 border border-[#D6D3D1]`}
                >
                  {course.category}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${course.statusColor}`}
                  >
                    {course.status}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FaUserDoctor className="text-lg" />
                  {course.instructor}
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen size={18} />
                    {course.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={18} />
                    {course.weeks} weeks
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={18} />
                    {course.totalHours} hr
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={18} />

                    {course.perSession} per session
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-2xl font-semibold text-[#7AA4A5]">
                    {course.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-[#7AA4A5]"
                    title="View Quick Details"
                  >
                    <Eye className="w-5 h-5 text-[#7AA4A5]" />
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
          <div className="bg-white rounded-lg max-w-xl w-full overflow-y-auto">
            <div className="p-6 border-b border-stone-100 sticky top-0 bg-white z-10 flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-stone-900 font-['Arimo']">
                  Course Details
                </h2>
                <p className="text-sm text-stone-500 font-['Arimo']">
                  Complete information about the course
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}

                <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Course Title
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-gray-900">
                    {selectedCourse.title}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Instructor
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-gray-900">
                    {selectedCourse.instructor}
                  </p>
                </div>    <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Category
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-gray-900">
                    {selectedCourse.category}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Status
                  </p>
                  <p
                    className={`bg-[#F9FAFB] p-4 rounded-lg text-sm font-medium rounded`}
                  >
                    <span className={`w-2 h-2 px-2 py-1 rounded-full ${selectedCourse.statusColor}`}> {selectedCourse.status}</span>
                  </p>
                </div> <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Price
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-teal-600">
                    {selectedCourse.price}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Duration
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-gray-900">
                    {selectedCourse.weeks} weeks
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500 mb-1">
                    Total Lessions
                  </p>
                  <p className="bg-[#F9FAFB] p-4 rounded-lg font-semibold text-gray-900">
                    {selectedCourse.lessons} lessons
                  </p>
                </div>
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
