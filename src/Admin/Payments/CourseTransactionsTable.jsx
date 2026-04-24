import React, { useState } from "react";
import { Eye, Search, Loader2 } from "lucide-react";
import { useGetTeacherEarningsQuery } from "../../Api/adminApi";
import TeacherEarningsModal from "./TeacherEarningsModal";

const CourseTransactionsTable = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: teachersData = [], isLoading, isError } = useGetTeacherEarningsQuery();

  const filteredTeachers = teachersData.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-zinc-100 rounded-lg outline-none text-sm text-gray-500 arimo-font"
            />
            <div className="absolute left-4 top-2.5">
              <Search size={16} color="#9CA3AF" />
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
                <th className="text-center p-4 text-neutral-950 text-sm font-normal arimo-font w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                      <p className="text-gray-500 text-sm">Loading earnings data...</p>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-red-500 text-sm">
                    Failed to load teacher earnings. Please try again.
                  </td>
                </tr>
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 text-sm">
                    No teachers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.teacher_id}
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
                        {formatCurrency(teacher.total_earnings)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {formatCurrency(teacher.course_revenue)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {formatCurrency(teacher.consultation_revenue)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {teacher.student_count}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-950 text-sm font-normal arimo-font leading-5">
                        {teacher.session_count}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedTeacher(teacher)}
                        className="w-9 h-8 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-center items-center hover:bg-neutral-50 transition-colors text-neutral-950"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TeacherEarningsModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </>
  );
};

export default CourseTransactionsTable;
