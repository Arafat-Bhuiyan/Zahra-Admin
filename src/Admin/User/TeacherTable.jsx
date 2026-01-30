import React from "react";
import { Eye, Trash2 } from "lucide-react";

const TeacherTable = ({ data, onView, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-center arimo-font min-w-[1000px]">
        <thead className="border-b border-black/10">
          <tr className="text-neutral-950">
            <th className="py-3 px-2 font-normal w-40 text-left">Name</th>
            <th className="py-3 px-2 font-normal w-48 text-left">Email</th>
            <th className="py-3 px-2 font-normal w-28 text-left">Department</th>
            <th className="py-3 px-2 font-normal w-20">Courses</th>
            <th className="py-3 px-2 font-normal w-20">Students</th>
            <th className="py-3 px-2 font-normal w-20">Status</th>
            <th className="py-3 px-2 font-normal w-48">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/10">
          {data.map((user, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50/50 transition-colors group"
            >
              <td className="py-4 px-2 text-neutral-950 whitespace-nowrap text-left">
                {user.name}
              </td>
              <td className="py-4 px-2 text-neutral-950 whitespace-nowrap text-left">
                {user.email}
              </td>
              <td className="py-4 px-2 text-neutral-950 whitespace-nowrap text-left">
                {user.department}
              </td>
              <td className="py-4 px-2 text-neutral-950">{user.courses}</td>
              <td className="py-4 px-2 text-neutral-950">{user.students}</td>
              <td className="py-4 px-2">
                <span
                  className={`px-3 py-1 rounded-lg text-xs arimo-font inline-flex items-center justify-center whitespace-nowrap ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-4 px-2">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onView(user)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-lg hover:bg-gray-100 transition-colors text-neutral-950 text-sm shadow-sm group/btn"
                  >
                    <Eye className="w-4 h-4 text-neutral-600 group-hover/btn:text-neutral-950" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onDelete(user.id, user.name)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#FB2C36] rounded-lg hover:bg-[#d9222b] transition-colors text-white text-sm shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
