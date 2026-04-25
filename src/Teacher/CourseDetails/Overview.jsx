import { useGetCourseByIdQuery, useGetCourseEnrollmentsQuery } from "../../Api/adminApi";

export default function CourseOverview({ course }) {
  const courseId = course?.id;

  const { data: courseDetail, isLoading: courseLoading } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });

  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useGetCourseEnrollmentsQuery(
    { courseId },
    { skip: !courseId }
  );

  const description = courseDetail?.description || course?.description;
  const subtitle = courseDetail?.subtitle || course?.subtitle;
  const enrollments = enrollmentsData?.results || [];
  const totalEnrolled = enrollmentsData?.count ?? 0;

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="border rounded-xl p-5 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {courseDetail?.title || course?.title}
        </h3>
        {subtitle && (
          <p className="text-gray-500 text-sm mb-4 italic">{subtitle}</p>
        )}
        {courseLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-5/6" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-4/6" />
          </div>
        ) : description ? (
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-gray-400 italic">No description available.</p>
        )}
      </div>

      {/* Enrolled Students */}
      <div className="border rounded-xl p-5 bg-white">
        <p className="text-gray-400 font-medium text-sm">Total Enrolled</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {enrollmentsLoading ? (
            <span className="inline-block h-7 w-24 bg-gray-100 animate-pulse rounded" />
          ) : (
            `${totalEnrolled} student${totalEnrolled !== 1 ? "s" : ""}`
          )}
        </h3>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Student Name</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enrollmentsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-32" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded w-40" /></td>
                    <td className="px-6 py-4"><div className="h-5 bg-gray-100 animate-pulse rounded-full w-16" /></td>
                  </tr>
                ))
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-400">
                    No students enrolled yet.
                  </td>
                </tr>
              ) : (
                enrollments.map((enrollment) => {
                  const student = enrollment.student;
                  const fullName = `${student?.first_name || ""} ${student?.last_name || ""}`.trim() || "—";
                  const status = enrollment.is_completed ? "Completed" : "Active";
                  return (
                    <tr key={enrollment.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{student?.email || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "Completed"
                            ? "bg-[#E6F6EC] text-[#00A63E]"
                            : "bg-[#EEF4FF] text-[#2563EB]"
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
