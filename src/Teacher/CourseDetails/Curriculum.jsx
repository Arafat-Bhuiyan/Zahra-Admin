import { ChevronDown, FileText, HelpCircle, Video, Radio, Link } from "lucide-react";
import { useState } from "react";
import { useGetCourseByIdQuery } from "../../Api/adminApi";
import LessonViewer from "./LessonViewer";

function formatDuration(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m} min`;
}

const CONTENT_TYPE_ICON = {
  video: Video,
  document: FileText,
  quiz: HelpCircle,
  assignment: FileText,
  external_link: Link,
  live: Radio,
};

const CONTENT_TYPE_LABEL = {
  video: "Video",
  document: "Document",
  quiz: "Quiz",
  assignment: "Assignment",
  external_link: "External Link",
  live: "Live Session",
};

export default function CourseCurriculum({ course }) {
  const courseId = course?.id;
  const { data: courseDetail, isLoading } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });

  const modules = courseDetail?.modules || [];
  const totalLessons = courseDetail?.total_lessons ?? 0;
  const totalWeeks = courseDetail?.duration_in_weeks ?? 0;

  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [selectedLesson, setSelectedLesson] = useState(null);

  const toggleModule = (idx) =>
    setExpandedModules((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <>
    <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Course Curriculum</h2>
        {isLoading ? (
          <div className="h-4 w-40 bg-gray-100 animate-pulse rounded" />
        ) : (
          <p className="text-sm text-gray-500">
            {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
            {totalWeeks > 0 && ` • ${totalWeeks} week${totalWeeks !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-stone-200 rounded-xl p-5">
              <div className="h-5 bg-gray-100 animate-pulse rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-100 animate-pulse rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : modules.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No modules available for this course.</p>
      ) : (
        <div className="space-y-4">
          {modules.map((module, idx) => {
            const duration = formatDuration(module.total_duration);
            const isOpen = !!expandedModules[idx];

            return (
              <div key={module.id} className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full flex items-center justify-between p-5 hover:bg-stone-50/50 transition-colors text-left"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{module.title}</h4>
                    <p className="text-sm text-gray-500">
                      {module.total_lessons} lesson{module.total_lessons !== 1 ? "s" : ""}
                      {duration && ` • ${duration}`}
                    </p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && module.lessons?.length > 0 && (
                  <div className="border-t border-stone-100 divide-y divide-stone-100">
                    {module.lessons.map((lesson) => {
                      const Icon = CONTENT_TYPE_ICON[lesson.content_type] || FileText;
                      const lessonDuration = formatDuration(lesson.duration_in_minutes);
                      const isLesson = lesson.content_type === "video" || lesson.content_type === "document" || lesson.content_type === "external_link";

                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-5 hover:bg-stone-50/60 transition-colors cursor-pointer"
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <div className="flex items-center gap-4">
                            <Icon
                              size={20}
                              className={`stroke-[1.5] ${isLesson ? "text-stone-400" : "text-gray-600"}`}
                            />
                            <div>
                              <span className={`text-base font-medium ${isLesson ? "text-gray-600" : "text-gray-800"}`}>
                                {lesson.title}
                              </span>
                              {lesson.content_type === "live" && lesson.scheduled_at && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {new Date(lesson.scheduled_at).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {lesson.is_preview && (
                              <span className="text-xs text-teal-600 font-medium border border-teal-200 rounded-full px-2 py-0.5">
                                Preview
                              </span>
                            )}
                            {lessonDuration ? (
                              <span className="text-sm text-gray-400 font-medium">{lessonDuration}</span>
                            ) : (
                              <span className="text-xs text-gray-400">{CONTENT_TYPE_LABEL[lesson.content_type] || lesson.content_type}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>

      <LessonViewer
        lesson={selectedLesson}
        courseId={courseId}
        onClose={() => setSelectedLesson(null)}
      />
    </>
  );
}
