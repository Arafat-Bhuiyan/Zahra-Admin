import { BookOpen, Video, Upload } from "lucide-react";

export default function TeacherDashboard() {
  // Sample data
  const stats = [
    {
      label: "Active Courses",
      value: "8",
      icon: BookOpen,
      color: "bg-blue-100",
    },
    {
      label: "Live Sessions Today",
      value: "3",
      icon: Video,
      color: "bg-green-100",
    },
    {
      label: "Uploaded Content",
      value: "42",
      icon: Upload,
      color: "bg-purple-100",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Introduction to Python",
      time: "10:00 AM",
      students: "32 students",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      time: "2:00 PM",
      students: "28 students",
    },
    {
      id: 3,
      title: "Database Design",
      time: "4:30 PM",
      students: "25 students",
    },
  ];

  const recentUploads = [
    {
      id: 1,
      title: "Week 5 Assignment.pdf",
      category: "Web Development",
      date: "Jan 5, 2026",
    },
    {
      id: 2,
      title: "Lecture Recording.mp4",
      category: "Data Science",
      date: "Jan 4, 2026",
    },
    {
      id: 3,
      title: "Study Guide.pdf",
      category: "Python Basics",
      date: "Jan 3, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow p-6 flex items-start gap-4"
              >
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={28} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Live Sessions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Upcoming Live Sessions
            </h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {session.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {session.time} • {session.students}
                    </p>
                  </div>
                  <span className="bg-teal-700 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Recent Uploads
            </h2>
            <div className="space-y-4">
              {recentUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {upload.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {upload.category}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {upload.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
