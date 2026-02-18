import React from "react";
import { Eye, Trash2, ExternalLink } from "lucide-react";

const DoorsTable = ({ data, onDelete, onView }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-center arimo-font min-w-[1000px]">
        <thead className="border-b border-black/10">
          <tr className="text-neutral-950">
            <th className="py-3 px-2 font-normal text-left">Title</th>
            <th className="py-3 px-2 font-normal text-left">Description</th>
            <th className="py-3 px-2 font-normal w-32">Modules</th>
            <th className="py-3 px-2 font-normal w-24">Price</th>
            <th className="py-3 px-2 font-normal w-32">Course Page</th>
            <th className="py-3 px-2 font-normal w-48">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/10">
          {data.map((door, index) => (
            <tr
              key={door.id || index}
              className="hover:bg-gray-50/50 transition-colors group"
            >
              <td className="py-4 px-2 text-neutral-950 text-left font-medium">
                {door.title}
              </td>
              <td className="py-4 px-2 text-neutral-500 text-left max-w-[300px] truncate">
                {door.description}
              </td>
              <td className="py-4 px-2 text-neutral-950">
                {door.modules} Modules
              </td>
              <td className="py-4 px-2 text-neutral-950 font-medium">
                ${door.price}
              </td>
              <td className="py-4 px-2">
                <a
                  href={door.courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#89A6A7] hover:text-[#729394] transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit</span>
                </a>
              </td>
              <td className="py-4 px-2">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onView(door)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-lg hover:bg-gray-100 transition-colors text-neutral-950 text-sm shadow-sm group/btn"
                  >
                    <Eye className="w-4 h-4 text-neutral-600 group-hover/btn:text-neutral-950" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onDelete(door.id, door.title)}
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

export default DoorsTable;
