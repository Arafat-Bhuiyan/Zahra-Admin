import React from "react";
import { Eye, Search } from "lucide-react";

const teachersData = [
  {
    id: 1,
    name: "Dr. Fatima Ara",
    email: "fatima.ara@platform.com",
    totalEarnings: "$12,400",
    courseRevenue: "$9,800",
    consultationRevenue: "$2,600",
    students: 247,
    sessions: 52,
    status: "active",
  },
  {
    id: 2,
    name: "Prof. Ahmed Hassan",
    email: "ahmed.hassan@platform.com",
    totalEarnings: "$18,750",
    courseRevenue: "$14,200",
    consultationRevenue: "$4,550",
    students: 382,
    sessions: 91,
    status: "active",
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    email: "sarah.williams@platform.com",
    totalEarnings: "$9,600",
    courseRevenue: "$7,200",
    consultationRevenue: "$2,400",
    students: 198,
    sessions: 48,
    status: "active",
  },
  {
    id: 4,
    name: "Prof. Omar Khan",
    email: "omar.khan@platform.com",
    totalEarnings: "$15,300",
    courseRevenue: "$11,500",
    consultationRevenue: "$3,800",
    students: 305,
    sessions: 76,
    status: "active",
  },
  {
    id: 5,
    name: "Dr. Maria Garcia",
    email: "maria.garcia@platform.com",
    totalEarnings: "$7,850",
    courseRevenue: "$5,900",
    consultationRevenue: "$1,950",
    students: 142,
    sessions: 39,
    status: "inactive",
  },
];

const CourseTransactionsTable = () => {
  return (
    <div className="w-full bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden">
      <div className="p-6 border-b border-black/10">
        <h3 className="text-neutral-950 text-base font-normal arimo-font leading-4">
          Teacher Earnings Overview
        </h3>
        <p className="text-gray-500 text-base font-normal arimo-font leading-6 mt-1">
          View and manage earnings for all teachers
        </p>
        <div className="mt-4 relative w-full">
          <input
            type="text"
            placeholder="Search teachers by name or email..."
            className="w-full pl-10 pr-3 py-2 bg-zinc-100 rounded-lg outline-none text-sm text-gray-500 arimo-font"
          />
          <div className="absolute left-4 top-2.5">
           <Search size={16} color="#9CA3AF"/>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-black/10">
              <th className="text-left p-4 pl-6 text-neutral-950 text-sm font-normal arimo-font w-72">
                Teacher
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-32">
                Total Earnings
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-36">
                Course Revenue
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-48">
                Consultation Revenue
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-20">
                Students
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-20">
                Sessions
              </th>
              <th className="text-left p-4 text-neutral-950 text-sm font-normal arimo-font w-24">
                Status
              </th>
              <th className="text-center p-4 text-neutral-950 text-sm font-normal arimo-font w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachersData.map((teacher) => (
              <tr
                key={teacher.id}
                className="border-b border-black/10 last:border-0 hover:bg-neutral-50/50 transition-colors"
              >
                <td className="p-4 pl-6">
                  <div className="flex flex-col">
                    <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                      {teacher.name}
                    </span>
                    <span className="text-gray-500 text-sm font-normal arimo-font leading-5">
                      {teacher.email}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-teal-600 text-sm font-bold arimo-font leading-5">
                    {teacher.totalEarnings}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                    {teacher.courseRevenue}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                    {teacher.consultationRevenue}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                    {teacher.students}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                    {teacher.sessions}
                  </span>
                </td>
                <td className="p-4">
                  <div
                    className={`inline-flex px-2 py-0.5 rounded-lg items-center gap-1 ${
                      teacher.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="text-xs font-normal arimo-font leading-4 capitalize">
                      {teacher.status}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button className="w-9 h-8 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-center items-center hover:bg-neutral-50 transition-colors text-neutral-950">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTransactionsTable;
