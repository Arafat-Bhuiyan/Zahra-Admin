import { ChevronDown, Play } from "lucide-react";
import { useState } from "react";

export default function CourseCurriculum({ course }) {
  const [expandedModules, setExpandedModules] = useState({});

  const modules = [
    {
      id: 1,
      title: "Module 1: Introduction",
      lessons: [
        { id: 1, title: "Course Overview" },
        { id: 2, title: "Getting Started" },
      ],
    },
    {
      id: 2,
      title: "Module 2: Core Concepts",
      lessons: [
        { id: 3, title: "Understanding Fundamentals" },
        { id: 4, title: "Practice Exercises" },
      ],
    },
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="space-y-2">
      {modules.map((module) => (
        <div key={module.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <h4 className="font-semibold text-gray-900">{module.title}</h4>
            <ChevronDown
              size={20}
              className={`text-gray-600 transition ${
                expandedModules[module.id] ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedModules[module.id] && (
            <div className="border-t border-gray-200 bg-gray-50 py-3">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="px-4 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-100"
                >
                  <Play size={16} className="text-teal-600 flex-shrink-0" />
                  <span>{lesson.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
