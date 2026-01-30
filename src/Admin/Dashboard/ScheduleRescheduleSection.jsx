import React from "react";
import { Calendar, AlertCircle } from "lucide-react";

const ScheduleRescheduleSection = () => {
  const schedules = [
    {
      title: "Advanced React Patterns",
      instructor: "John Smith",
      students: 45,
      time: "10:00 AM",
    },
    {
      title: "Data Science Fundamentals",
      instructor: "Sarah Johnson",
      students: 32,
      time: "2:00 PM",
    },
    {
      title: "UI/UX Design Workshop",
      instructor: "Mike Chen",
      students: 28,
      time: "4:30 PM",
    },
  ];

  const reschedules = [
    {
      name: "John Smith",
      course1: "React Advanced",
      course2: "Node.js Basics",
      time: "2:00 PM",
    },
    {
      name: "Sarah Johnson",
      course1: "Python ML",
      course2: "Data Analysis",
      time: "4:00 PM",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full mb-10">
      {/* Today's Scheduled Classes */}
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <h2 className="text-neutral-800 text-lg font-bold arimo-font">
            Today's Scheduled Classes
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {schedules.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-300/10 p-4 rounded-[10px] border border-stone-300/30 flex justify-between items-center gap-4"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-neutral-800 text-base font-normal arimo-font">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm font-normal arimo-font">
                  {item.instructor} • {item.students} students
                </p>
              </div>
              <span className="text-slate-400 text-base font-bold arimo-font whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reschedule */}
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-neutral-800 text-lg font-bold arimo-font">
              Recent Reschedule
            </h2>
          </div>
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            2 Active
          </span>
        </div>
        <div className="flex flex-col gap-3 text-['Arimo']">
          {reschedules.map((item, idx) => (
            <div
              key={idx}
              className="bg-red-50 p-4 rounded-[10px] border border-red-200 flex justify-between items-center gap-4 relative"
            >
              <div className="flex gap-4 items-start">
                <div className="w-5 h-5 flex items-center justify-center mt-1 shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-neutral-800 text-base font-normal">
                    {item.name}
                  </h3>
                  <div className="text-neutral-600 text-xs sm:text-sm font-normal leading-tight">
                    <span>{item.course1} </span>
                    <span className="text-gray-500 text-opacity-80">
                      overlaps with{" "}
                    </span>
                    <span>{item.course2} </span>
                    <span className="text-gray-500 text-opacity-80">
                      at {item.time}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-[#89A6A7] hover:bg-[#729394] text-white text-sm px-4 py-2 rounded-[10px] transition-colors whitespace-nowrap">
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleRescheduleSection;
