"use client";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseOverview from "./Overview";
import CourseCurriculum from "./Curriculum";
import CourseReviews from "./Reviews";
import CourseCommunity from "./Community";
import { ChevronLeft } from "lucide-react";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock course data - in production, fetch from API based on courseId
  const course = {
    id: courseId,
    title: "Tafair Al-Quran: Understanding Divine Guidance",
    instructor: "Dr. Ahmed Hassan",
    category: "Spiritual Growth",
    status: "Recorded",
    lessons: 24,
    weeks: 12,
    totalHours: 12,
    price: "$99",
    image: "/images/image.png",
    description:
      "Learn the fundamentals of Quranic interpretation with expert guidance from Dr. Ahmed Hassan. This comprehensive course covers essential concepts and methodologies.",
    level: "Intermediate",
    startDate: "Jan 10, 2026",
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "reviews", label: "Reviews" },
    { id: "community", label: "Community" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <CourseOverview course={course} />;
      case "curriculum":
        return <CourseCurriculum course={course} />;
      case "reviews":
        return <CourseReviews course={course} />;
      case "community":
        return <CourseCommunity course={course} />;
      default:
        return <CourseOverview course={course} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-medium"
        >
          <ChevronLeft size={20} />
          Back to Courses
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-gray-600 mb-4">{course.instructor}</p>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800`}
                >
                  {course.status}
                </span>
                <span className="text-lg font-semibold text-teal-600">
                  {course.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-lg border-b border-gray-200">
          <div className="flex gap-8 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
