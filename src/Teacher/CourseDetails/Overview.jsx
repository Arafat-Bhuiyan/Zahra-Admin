export default function CourseOverview({ course }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          About this Course
        </h3>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Course Details
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              <strong>Lessons:</strong> {course.lessons}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              <strong>Duration:</strong> {course.weeks} weeks
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              <strong>Level:</strong> {course.level}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-gray-700">
              <strong>Start Date:</strong> {course.startDate}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
