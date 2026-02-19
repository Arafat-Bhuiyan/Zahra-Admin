import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  X,
} from "lucide-react";

const CourseDetailsContent = ({ course }) => {
  if (!course) return null;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const students = [
    {
      id: 1,
      name: "Emma Wilson",
      courseDetails: "Full Stack Web Development",
      enrollmentDate: "2024-02-15 10:30 AM",
      paymentStatus: "Completed",
      orderId: "#ORD-7829",
    },
    {
      id: 2,
      name: "Michael Chen",
      courseDetails: "Advanced React Patterns",
      enrollmentDate: "2024-02-16 02:15 PM",
      paymentStatus: "Pending",
      orderId: "#ORD-7830",
    },
    {
      id: 3,
      name: "Sarah Parker",
      courseDetails: "UI/UX Design Masterclass",
      enrollmentDate: "2024-02-17 09:45 AM",
      paymentStatus: "Completed",
      orderId: "#ORD-7831",
    },
    {
      id: 4,
      name: "David Kim",
      courseDetails: "Node.js Backend Essentials",
      enrollmentDate: "2024-02-18 11:00 AM",
      paymentStatus: "Completed",
      orderId: "#ORD-7832",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      courseDetails: "Mobile App Development",
      enrollmentDate: "2024-02-19 04:30 PM",
      paymentStatus: "Failed",
      orderId: "#ORD-7833",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courseDetails
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.orderId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.paymentStatus === statusFilter;

      const matchesDate =
        !dateFilter || student.enrollmentDate.includes(dateFilter);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateFilter]);

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
              {filteredStudents.length}{" "}
              <span className="text-lg font-medium text-stone-400 ml-1">
                {filteredStudents.length === 1 ? "Student" : "Students"} found
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                type="text"
                placeholder="Search students, courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all w-64"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-11 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Course Details</th>
                <th className="px-6 py-4">Enrollment Date & Time</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4">Order ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-stone-800">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-stone-500 font-medium">
                      {student.courseDetails}
                    </td>
                    <td className="px-6 py-4 text-stone-500 font-medium whitespace-nowrap">
                      {student.enrollmentDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          student.paymentStatus === "Completed"
                            ? "bg-teal-50 text-teal-600"
                            : student.paymentStatus === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {student.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-teal-600 font-bold text-xs hover:underline transition-all">
                        {student.orderId}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 text-stone-300" />
                      <p className="text-stone-500 font-medium">
                        No students found matching your filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("All");
                          setDateFilter("");
                        }}
                        className="text-teal-600 text-sm font-bold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
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
