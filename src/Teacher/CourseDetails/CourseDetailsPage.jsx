"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CourseOverview from "./Overview";
import CourseCurriculum from "./Curriculum";
import CourseReviews from "./Reviews";
import CourseCommunity from "./Community";
import { ChevronLeft, Play, Share2, Twitter, Facebook } from "lucide-react";

function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "Teacher",
      name: "Teacher",
      time: "10:00 AM",
      text: "Welcome everyone! Feel free to ask questions anytime.",
    },
    {
      id: 2,
      role: "Student",
      name: "Student",
      time: "10:05 AM",
      text: "Thank you! Looking forward to the session.",
    },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const msg = {
      id: Date.now(),
      role: "Teacher",
      name: "You",
      time: new Date().toLocaleTimeString(),
      text,
    };
    setMessages((s) => [...s, msg]);
    setInput("");
  };

  return (
    <div>
      <div ref={containerRef} className="max-h-80 overflow-auto space-y-3 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 items-start ${m.role === "Teacher" ? "justify-start" : "justify-start"}`}
          >
            <div className="text-xs font-semibold text-teal-700 mb-1">
              {m.role}
            </div>
            <div>
              <div className="px-4 py-2 rounded-lg bg-green-50 text-gray-800">
                {m.text}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {m.name} · {m.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    location.state?.course?.status === "Live" ? "community" : "overview",
  );

  // Mock course data - in production, fetch from API based on courseId
  const passedCourse = location.state?.course;

  const mockCourse = {
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

  const course = passedCourse ? { ...mockCourse, ...passedCourse } : mockCourse;

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

        {/* Course Header (large) */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: big media */}
              <div className="flex-1 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg"
                />
                {/* play overlay for any course (visual) */}
                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white p-4 rounded-full shadow-lg">
                  <Play size={20} />
                </button>
              </div>

              {/* Right: info card */}
              <div className="w-full lg:w-80">
                <div className="bg-white border rounded-lg p-4 shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          src={course.image}
                          alt="thumb"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                          {course.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {course.instructor}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                            {course.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-lg font-semibold text-teal-600">
                            {course.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Enrolled
                          </p>
                          <p className="text-sm font-semibold text-gray-700">
                            245 Students
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Share2 size={16} />
                          <Twitter size={16} />
                          <Facebook size={16} />
                        </div>
                        <button className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm font-medium">
                          Enrolled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-lg border-b border-gray-200">
          <div className="flex gap-6 px-6">
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
                {tab.label === "community"
                  ? "Community Chat"
                  : `Course ${tab.label}`}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg shadow-sm p-8">
          {activeTab === "community" && course.status === "Live" ? (
            <div>
              {/* Live Community Chat UI */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-teal-600 font-semibold">
                    Chat
                  </div>
                  <div>
                    <p className="font-semibold">Community Chat</p>
                    <p className="text-sm text-gray-500">24 online</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Live now</div>
              </div>

              <LiveChat />
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
}
