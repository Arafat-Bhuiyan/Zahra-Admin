import React, { useState } from "react";
import {
  GripVertical,
  Plus,
  X,
  Video,
  FileText,
  Play,
  Monitor,
} from "lucide-react";

const CourseCurriculum = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Introduction to React Hooks",
      lessons: [
        {
          id: 101,
          title: "Understanding useState",
          duration: "15:30",
          type: "video",
        },
        {
          id: 102,
          title: "Working with useEffect",
          duration: "22:45",
          type: "video",
        },
        { id: 103, title: "Hooks Cheat Sheet", type: "document" },
      ],
    },
    {
      id: 2,
      title: "Advanced Patterns",
      lessons: [
        {
          id: 201,
          title: "Custom Hooks Deep Dive",
          duration: "28:15",
          type: "video",
        },
        {
          id: 202,
          title: "Context API Best Practices",
          duration: "19:30",
          type: "video",
        },
      ],
    },
  ]);

  const [newModuleTitle, setNewModuleTitle] = useState("");

  const addModule = () => {
    if (newModuleTitle.trim()) {
      const newModule = {
        id: Date.now(),
        title: newModuleTitle,
        lessons: [],
      };
      setModules([...modules, newModule]);
      setNewModuleTitle("");
    }
  };

  const addLesson = (moduleId) => {
    const lessonTitle = prompt("Enter lesson title:");
    if (lessonTitle) {
      setModules(
        modules.map((mod) => {
          if (mod.id === moduleId) {
            return {
              ...mod,
              lessons: [
                ...mod.lessons,
                {
                  id: Date.now(),
                  title: lessonTitle,
                  duration: "00:00",
                  type: "video",
                },
              ],
            };
          }
          return mod;
        }),
      );
    }
  };

  const removeLesson = (moduleId, lessonId) => {
    setModules(
      modules.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.filter((lesson) => lesson.id !== lessonId),
          };
        }
        return mod;
      }),
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Modules List */}
      <div className="space-y-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden"
          >
            {/* Module Header */}
            <div className="bg-[#D6CBAF33] px-8 py-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-stone-300 cursor-grab" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-stone-800 arimo-font">
                    {mod.title}
                  </h3>
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-widest mt-1">
                    {mod.lessons.length}{" "}
                    {mod.lessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => addLesson(mod.id)}
                className="flex items-center gap-2 bg-greenTeal hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lesson</span>
              </button>
            </div>

            {/* Lessons List */}
            <div className="p-6 space-y-3">
              {mod.lessons.length > 0 ? (
                mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 bg-white border border-stone-100 rounded-2xl hover:border-teal-200 hover:shadow-md transition-all group"
                  >
                    <GripVertical className="w-4 h-4 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                    <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400">
                      {lesson.type === "video" ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-stone-800 arimo-font">
                        {lesson.title}
                      </h4>
                      {lesson.duration && (
                        <span className="text-[10px] font-bold text-stone-400 arimo-font mt-0.5 block">
                          {lesson.duration}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeLesson(mod.id, lesson.id)}
                      className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-stone-400 text-sm font-medium border-2 border-dashed border-stone-100 rounded-2xl">
                  No lessons added yet. Click Add Lesson to start.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Module Section */}
      <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 mt-4 space-y-4">
        <h3 className="text-sm font-black text-stone-800 uppercase tracking-widest inter-font">
          Add New Module
        </h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="Module title (e.g., Understanding Anxiety)"
            className="flex-1 bg-white border border-stone-200 rounded-2xl px-6 py-3.5 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
            onKeyDown={(e) => e.key === "Enter" && addModule()}
          />
          <button
            onClick={addModule}
            className="bg-greenTeal hover:bg-teal-700 text-white px-8 py-3.5 rounded-2xl font-black transition-all flex items-center gap-2 shadow-lg shadow-teal-900/10 active:scale-95 inter-font"
          >
            <Plus className="w-5 h-5" />
            <span>Add Module</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;
