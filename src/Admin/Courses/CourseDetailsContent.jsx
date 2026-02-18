import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const CourseDetailsContent = ({ course }) => {
  if (!course) return null;

  const students = [
    { id: 1, name: "Emma Wilson", email: "emma.w@email.com" },
    { id: 2, name: "Michael Chen", email: "michael.c@email.com" },
    { id: 3, name: "Sarah Parker", email: "sarah.p@email.com" },
    { id: 4, name: "David Kim", email: "david.k@email.com" },
    { id: 5, name: "Lisa Anderson", email: "lisa.a@email.com" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Details Grid */}
      <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
        <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          Course Information
        </div>
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
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3 block">
              Description
            </label>
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100 text-[15px] text-stone-600 leading-relaxed font-medium">
              {course.description || "No description provided."}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            What You'll Learn
          </div>
          <div className="space-y-3">
            {course.learningObjectives?.map((obj, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-3 bg-teal-50/30 rounded-xl border border-teal-50"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                <span className="text-sm text-stone-700 font-medium leading-relaxed">
                  {obj}
                </span>
              </div>
            )) || <span className="text-sm text-stone-400">N/A</span>}
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Requirements
          </div>
          <div className="space-y-3">
            {course.requirements?.map((req, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-3 bg-amber-50/30 rounded-xl border border-amber-50"
              >
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-stone-700 font-medium leading-relaxed">
                  {req}
                </span>
              </div>
            )) || <span className="text-sm text-stone-400">N/A</span>}
          </div>
        </section>
      </div>

      {/* Enrollment Stats */}
      <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Enrollment Status
            </p>
            <h3 className="text-3xl font-black text-stone-900">
              245{" "}
              <span className="text-lg font-medium text-stone-400 ml-1">
                Students enrolled
              </span>
            </h3>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-stone-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-stone-800">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="px-5 py-3.5 bg-stone-50 rounded-2xl border border-stone-100 font-bold text-stone-800">
      {value}
    </div>
  </div>
);

export default CourseDetailsContent;
