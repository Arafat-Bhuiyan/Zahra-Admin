import {
  Lock,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Users,
  Clock,
  Info,
} from "lucide-react";

export default function EarningsRevenue() {
  const courseRevenue = [
    { name: "Mindfulness in Islam", students: 42, revenue: "$4,158" },
    {
      name: "Quran: Understanding Daily Supplication",
      students: 38,
      revenue: "$3,762",
    },
    { name: "Islamic Psychology Basics", students: 28, revenue: "$2,100" },
  ];

  const consultationRevenue = [
    { period: "January 2026", sessions: 12, hours: "12h", revenue: "$600" },
    { period: "December 2025", sessions: 15, hours: "15h", revenue: "$750" },
    { period: "November 2025", sessions: 10, hours: "10h", revenue: "$500" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Teaching Rate Card */}
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-sm font-normal arimo-font">
              Teaching Rate
            </span>
            <span className="text-gray-900 text-3xl font-bold arimo-font">
              $25
            </span>
            <span className="text-gray-500 text-xs font-normal arimo-font">
              Per Course
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-[10px] flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Consultation Rate Card */}
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-sm font-normal arimo-font">
              Consultation Rate
            </span>
            <span className="text-gray-900 text-3xl font-bold arimo-font">
              $35
            </span>
            <span className="text-gray-500 text-xs font-normal arimo-font">
              Per Hour
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-[10px] flex items-center justify-center">
            <Lock className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white p-6 rounded-2xl border border-black/10 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 text-sm font-normal arimo-font">
              Total Earnings
            </span>
            <span className="text-gray-900 text-3xl font-bold arimo-font">
              $5,010
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-[10px] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3 items-start">
        <div className="mt-1">
          <Lock className="w-4 h-4 text-amber-700" />
        </div>
        <div className="flex flex-col">
          <span className="text-amber-900 text-sm font-bold arimo-font">
            Read-Only Section
          </span>
          <span className="text-amber-800 text-sm font-normal arimo-font leading-5">
            Hourly rates and payment terms are set and managed by admin. Contact
            admin for any rate-related inquiries or discrepancies.
          </span>
        </div>
      </div>

      {/* Course Revenue Table */}
      <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-greenTeal" />
          <h2 className="text-greenTeal text-base font-medium inter-font">
            Course Revenue Breakdown
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font w-1/3 text-left">
                  Course Name
                </th>
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font w-1/3 text-center">
                  Students
                </th>
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font w-1/3 text-right">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courseRevenue.map((course, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 text-neutral-950 text-base font-medium inter-font text-left truncate">
                    {course.name}
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-gray-600 text-base font-normal inter-font">
                      <Users size={14} className="text-gray-400" />
                      {course.students}
                    </div>
                  </td>
                  <td className="py-4 text-[#7AAFAF] text-base font-bold inter-font text-right">
                    {course.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultation Revenue Table */}
      <div className="bg-white rounded-2xl border border-black/10 p-6 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-greenTeal" />
          <h2 className="text-greenTeal text-base font-medium inter-font">
            Consultation Revenue Breakdown
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font">
                  Period
                </th>
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font">
                  Sessions
                </th>
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font">
                  Hours
                </th>
                <th className="pb-3 text-gray-600 text-sm font-semibold inter-font text-right">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {consultationRevenue.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 text-neutral-950 text-base font-medium inter-font">
                    {item.period}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 text-base font-normal inter-font">
                      <MessageSquare size={14} className="text-gray-400" />
                      {item.sessions} sessions
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 text-base font-normal inter-font">
                      <Clock size={14} className="text-gray-400" />
                      {item.hours}
                    </div>
                  </td>
                  <td className="py-4 text-[#7AAFAF] text-base font-bold inter-font text-right">
                    {item.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
