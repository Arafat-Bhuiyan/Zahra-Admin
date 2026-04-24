import React from "react";

const TopPerformingCourses = ({ courses = [] }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm">
      <div className="p-6">
        <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4 mb-2">
          Top Performing Courses
        </h2>
        <p className="text-gray-500 text-base font-normal arimo-font leading-6">
          Top courses with highest revenue
        </p>
      </div>

      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full text-sm text-left arimo-font min-w-[800px]">
          <thead className="border-b border-black/10">
            <tr>
              <th className="py-2.5 px-2 font-normal text-neutral-950 w-80">
                Title
              </th>
              <th className="py-2.5 px-2 font-normal text-neutral-950 w-64">
                Instructor
              </th>

              <th className="py-2.5 px-2 font-normal text-neutral-950 w-36 text-center">
                Students
              </th>
              <th className="py-2.5 px-2 font-normal text-neutral-950 w-28 text-right">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 px-2 text-center text-neutral-500"
                >
                  No courses available
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr key={index}>
                  <td className="py-3 px-2 text-neutral-950">{course.title}</td>
                  <td className="py-3 px-2 text-neutral-950">
                    {course.instructor}
                  </td>
                  <td className="py-3 px-2 text-gray-500 text-center">
                    {course.student_count}
                  </td>
                  <td className="py-3 px-2 text-[#0D9488] font-bold text-right">
                    ${course.revenue}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingCourses;
