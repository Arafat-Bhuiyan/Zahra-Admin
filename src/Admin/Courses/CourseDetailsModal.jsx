import React from "react";
import { X, Plus, Star, Users, Mail, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const CourseDetailsModal = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  // Mock student data - in a real app, this would come from the course object or an API
  const students = [
    { id: 1, name: "Emma Wilson", email: "emma.w@email.com" },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
    },
    {
      id: 3,
      name: "Sarah Parker",
      email: "sarah.p@email.com",
    },
    { id: 4, name: "David Kim", email: "david.k@email.com" },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white w-full max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[20px] shadow-2xl relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
              onClick={onClose}
              className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <DetailItem label="Course Title" value={course.title} />
            </div>
            <div className="col-span-2">
              <DetailItem
                label="Course Subtitle"
                value={course.subtitle || "N/A"}
              />
            </div>
            <div className="col-span-2">
              <DetailItem label="Level" value={course.level || "Beginner"} />
            </div>
            <DetailItem label="Instructor" value={course.instructor} />
            <DetailItem label="Category" value={course.category} />

            <DetailItem label="Price" value={course.price} />
            <DetailItem label="Duration" value={course.duration} />
            <DetailItem
              label="Total Lessons"
              value={`${course.lessons} lessons`}
            />
            <div className="col-span-2">
              <label className="text-xs font-medium text-stone-500 font-['Arimo'] mb-2 block uppercase tracking-wider">
                Description
              </label>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-sm text-stone-600 leading-relaxed font-['Arimo']">
                {course.description || "No description provided."}
              </div>
            </div>
          </div>

          {/* Learning Objectives & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-teal-600 uppercase tracking-widest font-['Arimo']">
                What You'll Learn
              </label>
              <div className="space-y-2">
                {course.learningObjectives?.map((obj, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span className="text-xs text-stone-600 font-medium">
                      {obj}
                    </span>
                  </div>
                )) || <span className="text-xs text-stone-400">N/A</span>}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-amber-600 uppercase tracking-widest font-['Arimo']">
                Requirements
              </label>
              <div className="space-y-2">
                {course.requirements?.map((req, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                    <span className="text-xs text-stone-600 font-medium">
                      {req}
                    </span>
                  </div>
                )) || <span className="text-xs text-stone-400">N/A</span>}
              </div>
            </div>
          </div>

          {/* Enrollment Stats */}
          <div className="pt-2">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1 font-['Arimo']">
              Total Enrolled
            </p>
            <h3 className="text-2xl font-bold text-stone-900 font-['Arimo']">
              245 students
            </h3>
          </div>

          {/* Students Table */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left font-['Arimo']">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-stone-900">
                      {student.name}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {student.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-100 flex justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, isRich }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-medium text-stone-500 font-['Arimo']">
      {label}
    </span>
    <div className="px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-100 group hover:border-teal-200 transition-colors">
      <span
        className={`text-[15px] ${isRich ? "text-stone-900 font-bold" : "text-stone-700"} font-['Arimo']`}
      >
        {value}
      </span>
    </div>
  </div>
);

export default CourseDetailsModal;
