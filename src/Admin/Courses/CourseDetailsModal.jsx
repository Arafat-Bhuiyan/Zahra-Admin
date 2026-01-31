import React from "react";
import { X, Plus, Star, Users, Mail, CheckCircle2, Clock } from "lucide-react";

const CourseDetailsModal = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  // Mock student data - in a real app, this would come from the course object or an API
  const students = [
    { id: 1, name: "Emma Wilson", email: "emma.w@email.com", status: "Active" },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Sarah Parker",
      email: "sarah.p@email.com",
      status: "Active",
    },
    { id: 4, name: "David Kim", email: "david.k@email.com", status: "Behind" },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      status: "Active",
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
            <DetailItem label="Course Title" value={course.title} />
            <DetailItem label="Instructor" value={course.instructor} />
            <DetailItem label="Category" value={course.category} />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-stone-500 font-['Arimo']">
                Status
              </span>
              <div className="flex">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    course.status === "Live"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : course.status === "Upcoming"
                        ? "bg-lime-50 text-lime-600 border border-lime-100"
                        : "bg-sky-50 text-sky-600 border border-sky-100"
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>
            <DetailItem label="Price" value={course.price} />
            <DetailItem label="Duration" value={course.duration} />
            <DetailItem
              label="Total Lessons"
              value={`${course.lessons} lessons`}
            />
            <DetailItem
              label="Rating"
              value={`⭐ ${course.rating || "4.8"}/5.0`}
              isRich
            />
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
                  <th className="px-4 py-3">Status</th>
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
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          student.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {student.status}
                      </span>
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
