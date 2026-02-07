import { ChevronDown, CheckCircle2, FileText, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function CourseCurriculum({ course }) {
  const [expandedModules, setExpandedModules] = useState({ 1: true });

  const modules = [
    {
      id: 1,
      title: "Module 1: Understanding Anxiety",
      lessonsCount: 4,
      duration: "52 min",
      items: [
        { id: 1, type: "lesson", title: "Introduction to the Course", duration: "5:30" },
        { id: 2, type: "lesson", title: "What is Anxiety?", duration: "12:45" },
        { id: 3, type: "quiz", title: "Quiz" },
        { id: 4, type: "assignment", title: "Assignment" },
      ],
    },
    {
      id: 2,
      title: "Module 2: Dhikr & Mindfulness",
      lessonsCount: 4,
      duration: "48 min",
      items: [{ id: 1, type: "lesson", title: "Introduction to the Course", duration: "5:30" },
      { id: 2, type: "lesson", title: "What is Anxiety?", duration: "12:45" }, { id: 3, type: "quiz", title: "Quiz" },
      { id: 4, type: "assignment", title: "Assignment" },],
    },
    {
      id: 3,
      title: "Module 3: Cognitive Approaches",
      lessonsCount: 4,
      duration: "56 min",
      items: [],
    },
    {
      id: 4,
      title: "Module 4: Tawakkul & Trust",
      lessonsCount: 5,
      duration: "62 min",
      items: [],
    },
    {
      id: 5,
      title: "Module 5: Building Resilience",
      lessonsCount: 4,
      duration: "54 min",
      items: [],
    },
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Course Curriculum</h2>
        <p className="text-sm text-gray-500">22 lessons • 3 weeks</p>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="border border-stone-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-50/50 transition-colors text-left"
            >
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{module.title}</h4>
                <p className="text-sm text-gray-500">{module.lessonsCount} lessons • {module.duration}</p>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform duration-300 ${expandedModules[module.id] ? "rotate-180" : ""
                  }`}
              />
            </button>

            {expandedModules[module.id] && module.items.length > 0 && (
              <div className="border-t border-stone-100 divide-y divide-stone-100">
                {module.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-5 hover:bg-stone-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {item.type === "lesson" && (
                        <div className="text-stone-300">
                          <CheckCircle2 size={20} className="stroke-[1.5]" />
                        </div>
                      )}
                      {item.type === "quiz" && (
                        <div className="text-gray-600">
                          <HelpCircle size={20} className="stroke-[1.5]" />
                        </div>
                      )}
                      {item.type === "assignment" && (
                        <div className="text-gray-600">
                          <FileText size={20} className="stroke-[1.5]" />
                        </div>
                      )}
                      <span className={`text-base font-medium ${item.type === "lesson" ? "text-gray-600" : "text-gray-800"}`}>
                        {item.title}
                      </span>
                    </div>
                    {item.type === "lesson" && (
                      <span className="text-sm text-gray-400 font-medium">{item.duration}</span>
                    )}
                    {item.type !== "lesson" && (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
