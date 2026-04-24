import React from "react";
import { X, Users, Clock } from "lucide-react";
import { MessageSquare, BookOpen } from "lucide-react";

const TeacherEarningsModal = ({ teacher, onClose }) => {
  if (!teacher) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const statsData = [
    {
      label: "Total Earnings",
      value: formatCurrency(teacher.total_earnings),
      icon: (
        <div className="w-5 h-5 relative flex justify-center items-center">
          <span className="text-teal-600 font-bold">$</span>
        </div>
      ),
      bgColor: "bg-teal-100",
    },
    {
      label: "Course Revenue",
      value: formatCurrency(teacher.course_revenue),
      icon: <BookOpen className="w-5 h-5 text-[#155DFC]" />,
      bgColor: "bg-blue-100",
    },
    {
      label: "Consultation Revenue",
      value: formatCurrency(teacher.consultation_revenue),
      icon: <MessageSquare className="w-5 h-5 text-[#00A63E]" />,
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-[751px] max-h-[90vh] bg-white rounded-[10px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="w-full h-28 px-6 pt-6 pb-px bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] border-b border-neutral-200 flex flex-col justify-start items-start shrink-0">
          <div className="w-full h-14 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-2xl font-bold arimo-font leading-8">
                Earnings Details - {teacher.name}
              </h2>
              <p className="text-white/90 text-base font-normal arimo-font leading-6">
                {teacher.email}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-[10px] hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 ${stat.bgColor} rounded-[10px] flex justify-center items-center shrink-0`}
                >
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm font-normal arimo-font leading-5">
                    {stat.label}
                  </span>
                  <span className="text-neutral-950 text-xl font-bold arimo-font leading-7">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Overveiw */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-50 rounded-2xl flex flex-col gap-4 border border-black/5">
              <div className="flex items-center gap-3 text-blue-600">
                <Users className="w-5 h-5" />
                <h3 className="text-base font-bold arimo-font">Student Reach</h3>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-neutral-950">{teacher.student_count}</span>
                <span className="text-sm text-gray-500">Total enrolled students</span>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-2xl flex flex-col gap-4 border border-black/5">
              <div className="flex items-center gap-3 text-teal-600">
                <Clock className="w-5 h-5" />
                <h3 className="text-base font-bold arimo-font">Consultation Activity</h3>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-neutral-950">{teacher.session_count}</span>
                <span className="text-sm text-gray-500">Total sessions completed</span>
              </div>
            </div>
          </div>

          {/* <div className="p-8 bg-teal-50/50 rounded-2xl border border-teal-100 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-teal-800 font-medium">Detailed Transaction History</p>
            <p className="text-teal-600/70 text-sm max-w-md">
              Individual course sales and session logs are available in the main transactions export. 
              The values shown above reflect synchronized real-time totals.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherEarningsModal;
