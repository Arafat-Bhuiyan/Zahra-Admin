import React from "react";
import { X, Users, Clock } from "lucide-react";
import { MessageSquare, BookOpen } from "lucide-react";

const TeacherEarningsModal = ({ teacher, onClose }) => {
    console.log(teacher);
  if (!teacher) return null;

  const statsData = [
    {
      label: "Total Earnings",
      value: teacher.totalEarnings,
      icon: (
        <div className="w-5 h-5 relative flex justify-center items-center">
          <span className="text-teal-600 font-bold">$</span>
        </div>
      ),
      bgColor: "bg-teal-100",
    },
    {
      label: "Course Revenue",
      value: teacher.courseRevenue,
      icon: <BookOpen className="w-5 h-5 text-[#155DFC]" />,
      bgColor: "bg-blue-100",
    },
    {
      label: "Consultation Revenue",
      value: teacher.consultationRevenue,
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
                Earnings Details - {teacher.name || "Teacher Name"}
              </h2>
              <p className="text-white/90 text-base font-normal arimo-font leading-6">
                Track income from courses and consultations
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

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
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

          {/* Course Revenue Breakdown */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-greenTeal" />
              <span className="text-greenTeal text-lg font-bold arimo-font leading-7">
                Course Revenue Breakdown
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-black/10">
              <table className="w-full border-collapse">
                <thead className="bg-transparent border-b border-black/10">
                  <tr>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 pl-4 w-[40%]">
                      Course Name
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[12%]">
                      Students
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[10%]">
                      Price
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[15%]">
                      Total Sales
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[13%]">
                      Revenue
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[10%]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Mindfulness in Islam",
                      students: 42,
                      price: "$99",
                      sales: "42 sales",
                      revenue: "$4,158",
                      active: true,
                    },
                    {
                      name: "Quran: Understanding Daily Supplication",
                      students: 38,
                      price: "$99",
                      sales: "38 sales",
                      revenue: "$3,762",
                      active: true,
                    },
                    {
                      name: "Islamic Psychology Basics",
                      students: 28,
                      price: "$75",
                      sales: "28 sales",
                      revenue: "$2,100",
                      active: true,
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-black/10 last:border-0 hover:bg-neutral-50"
                    >
                      <td className="py-3 px-2 pl-4 text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {row.name}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                            {row.students}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {row.price}
                      </td>
                      <td className="py-3 px-2 text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {row.sales}
                      </td>
                      <td className="py-3 px-2 text-teal-600 text-sm font-bold arimo-font leading-5">
                        {row.revenue}
                      </td>
                      <td className="py-3 px-2">
                        <div
                          className={`w-fit h-5 px-2 py-0.5 rounded-lg flex items-center justify-center gap-1 ${row.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          <span className="text-xs font-normal arimo-font leading-4">
                            {row.active ? "active" : "inactive"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consultation Revenue Breakdown */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-greenTeal" />
              <span className="text-greenTeal text-lg font-bold arimo-font leading-7">
                Consultation Revenue Breakdown
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-black/10">
              <table className="w-full border-collapse">
                <thead className="bg-transparent border-b border-black/10">
                  <tr>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 pl-4 w-[30%]">
                      Period
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[25%]">
                      Sessions
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[15%]">
                      Hours
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[15%]">
                      Rate/Session
                    </th>
                    <th className="py-3 px-2 text-left text-neutral-950 text-sm font-normal arimo-font leading-5 w-[15%]">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      period: "January 2026",
                      sessions: 12,
                      hours: "12h",
                      rate: "$50",
                      revenue: "$600",
                    },
                    {
                      period: "December 2025",
                      sessions: 15,
                      hours: "15h",
                      rate: "$50",
                      revenue: "$750",
                    },
                    {
                      period: "November 2025",
                      sessions: 10,
                      hours: "10h",
                      rate: "$50",
                      revenue: "$500",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-black/10 last:border-0 hover:bg-neutral-50"
                    >
                      <td className="py-3 px-2 pl-4 text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {row.period}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                            {row.sessions} sessions
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                            {row.hours}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {row.rate}
                      </td>
                      <td className="py-3 px-2 text-teal-600 text-sm font-bold arimo-font leading-5">
                        {row.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherEarningsModal;
