import React from "react";
import {
  BookOpen,
  Award,
  Clock,
  Users,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const StatsCard = ({ icon: Icon, color, label, value }) => {
  const colorStyles = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      outline: "outline-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      outline: "outline-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      outline: "outline-yellow-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      outline: "outline-purple-600",
    },
  };

  const style = colorStyles[color];

  return (
    <div className="flex-1 min-w-[240px] px-6 py-6 bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col justify-start items-start hover:shadow-md transition-all">
      <div className="self-stretch flex justify-start items-center gap-4">
        <div
          className={`w-12 h-12 ${style.bg} rounded-full flex justify-center items-center`}
        >
          <Icon className={`w-6 h-6 ${style.text}`} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-neutral-500 text-sm font-normal arimo-font leading-5">
            {label}
          </div>
          <div className="text-neutral-800 text-2xl font-bold arimo-font leading-8">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ number, title, subtitle }) => (
  <div className="w-full flex items-start gap-4">
    <div className="w-6 h-6 bg-greenTeal rounded-full flex justify-center items-center shrink-0">
      <span className="text-white text-sm font-bold arimo-font">{number}</span>
    </div>
    <div className="flex flex-row items-baseline gap-1 flex-wrap">
      <span className="text-neutral-700 text-base font-bold arimo-font">
        {title}
      </span>
      <span className="text-neutral-700 text-base font-normal arimo-font">
        {subtitle}
      </span>
    </div>
  </div>
);

const CourseCard = ({ course }) => {
  return (
    <div className="w-full p-5 rounded-2xl bg-white border border-neutral-200 hover:shadow-md transition-all flex justify-between items-center group cursor-pointer hover:border-slate-300">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-b from-greenTeal to-stone-300 rounded-[10px] flex justify-center items-center text-white">
          <BookOpen size={28} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-neutral-800 text-lg font-bold arimo-font group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-neutral-500 text-sm font-normal arimo-font">
            Instructor: {course.instructor}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-12 mr-4">
        <div className="flex flex-col items-center w-24">
          <span className="text-neutral-800 text-2xl font-bold arimo-font">
            {course.totalStudents}
          </span>
          <span className="text-neutral-500 text-xs font-normal arimo-font">
            Total Students
          </span>
        </div>
        <div className="flex flex-col items-center w-20">
          <span className="text-green-600 text-2xl font-bold arimo-font">
            {course.completed}
          </span>
          <span className="text-neutral-500 text-xs font-normal arimo-font">
            Completed
          </span>
        </div>
      </div>
      <div className="pr-4 text-neutral-300 group-hover:text-blue-500 transition-colors">
        <ChevronRight size={24} />
      </div>
    </div>
  );
};

const Certificate = () => {
  const stats = [
    {
      label: "Total Courses",
      value: 4,
      icon: BookOpen,
      color: "blue",
    },
    {
      label: "Certificates Issued",
      value: 195,
      icon: Award,
      color: "green",
    },
    {
      label: "Pending Certificates",
      value: 19,
      icon: Clock,
      color: "yellow",
    },
    {
      label: "Total Students",
      value: 321,
      icon: Users,
      color: "purple",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Dr. Sarah Johnson",
      totalStudents: 45,
      completed: 32,
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Prof. Michael Chen",
      totalStudents: 67,
      completed: 48,
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Wilson",
      totalStudents: 89,
      completed: 56,
    },
    {
      id: 4,
      title: "Full Stack Development Bootcamp",
      instructor: "Dr. James Wilson",
      totalStudents: 120,
      completed: 78,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Hero / Instructions Section */}
      <div className="w-full bg-gradient-to-br from-[#D6CBAF4D] to-[#7AA4A533] rounded-2xl p-8 flex justify-between items-center relative overflow-hidden">
        {/* Background Decorative Elements (Optional) */}

        <div className="flex-1 z-10">
          <h2 className="text-neutral-800 text-3xl font-bold arimo-font mb-6">
            Generate Certificates in 3 Steps
          </h2>
          <div className="space-y-3 max-w-lg">
            <StepItem
              number="1"
              title="Select a course"
              subtitle="from the list below"
            />
            <StepItem
              number="2"
              title="Create Template"
              subtitle="for certificates"
            />
            <StepItem
              number="3"
              title="Choose students"
              subtitle="who completed the course"
            />
            <StepItem
              number="4"
              title="Generate certificates"
              subtitle="for all selected students at once"
            />
          </div>
        </div>

        {/* Illustration Placeholer / Image */}
        <div className="hidden lg:block w-[400px] h-full object-cover">
          <div className="w-full h-48 bg-white/50 rounded-xl border border-white/60 shadow-lg p-4 flex items-center justify-center relative transform rotate-[-2deg] hover:rotate-0 transition-all duration-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600">
                <Award size={32} />
              </div>
              <div className="font-bold text-neutral-800 text-lg arimo-font">
                Certificate of Completion
              </div>
              <div className="text-neutral-500 text-sm arimo-font mt-1">
                Given to{" "}
                <span className="font-bold text-blue-600">John Doe</span>
              </div>
            </div>
            {/* Decorative confetti */}
            <div className="absolute top-2 left-2 text-yellow-400">
              <CheckCircle size={16} />
            </div>
            <div className="absolute bottom-4 right-6 text-purple-400">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="text-neutral-800 text-xl font-bold arimo-font">
          Select a Course
        </h2>
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
