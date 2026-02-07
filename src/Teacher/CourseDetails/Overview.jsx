import { CircleCheck } from "lucide-react";

export default function CourseOverview({ course }) {
  return (
    <div className="space-y-6">
      <div className="border rounded-xl p-5 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          40 Days Towards Change "Faith-centered emotional healing journey"
        </h3>
        <p className="text-gray-700 leading-relaxed">This comprehensive healing program integrates Islamic spiritual practices with evidence-based psychological approaches. Through 5 carefully designed modules over 6 weeks (40 Days), you will learn tools and insights to overcome stress, build emotional resilience, and find inner peace through faith-based approaches.</p> <br />
        <p className="text-gray-700 leading-relaxed">The course combines video lessons, guided exercises, daily routines, and community support to help you develop lasting mental wellness practices rooted in Islamic teachings. Each session is 2 hours, designed to give you deep understanding and practical application.</p>
      </div>

      <div className="border rounded-xl p-5 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What You'll Learn
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />
            <span className="text-gray-700">
              Understanding anxiety from both Islamic and psychological perspectives
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Integrate dhikr and mindfulness techniques for anxiety relief
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Apply cognitive behavioral strategies rooted in Islamic teachings
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Build lasting emotional resilience through faith practices
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Creating personalized anxiety management routines
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Recognizing triggers and developing coping mechanisms
            </span>
          </li>
        </ul>
      </div>
      <div className="border rounded-xl p-5 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Requirements
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />
            <span className="text-gray-700">
              Open mind and willingness to learn            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Basic understanding of Islam            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Notebook for exercises            </span>
          </li>
          <li className="flex items-start gap-3">
            <CircleCheck size={20} className="text-primary" />

            <span className="text-gray-700">
              Commitment to daily practice            </span>
          </li>

        </ul>
      </div>
      <div className="border rounded-xl p-5 bg-white">
        <p className="text-gray-400 font-medium text-sm">Total Enrolled</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          245 students
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
              {[
                { name: "Emma Wilson", email: "emma.w@email.com", status: "Active" },
                { name: "Michael Chen", email: "michael.c@email.com", status: "Active" },
                { name: "Sarah Parker", email: "sarah.p@email.com", status: "Active" },
                { name: "David Kim", email: "david.k@email.com", status: "Behind" },
                { name: "Lisa Anderson", email: "lisa.a@email.com", status: "Active" },
              ].map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${student.status === "Active"
                      ? "bg-[#E6F6EC] text-[#00A63E]"
                      : "bg-[#FFF4E5] text-[#FF9500]"
                      }`}>
                      {student.status}
                    </span>
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
