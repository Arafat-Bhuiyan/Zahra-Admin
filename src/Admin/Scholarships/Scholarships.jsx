import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";

const Scholarships = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      name: "Islamic Excellence Scholarship 2024",
      type: "Full Funding",
      applicants: 156,
      deadline: "2024-06-30",
      status: "Open",
      amount: "$15,000",
    },
    {
      id: 2,
      name: "Global Outreach Research Grant",
      type: "Research",
      applicants: 42,
      deadline: "2024-05-15",
      status: "Closed",
      amount: "$5,000",
    },
    {
      id: 3,
      name: "Merit-Based Academic Reward",
      type: "Partial",
      applicants: 305,
      deadline: "2024-08-20",
      status: "Open",
      amount: "$2,500",
    },
    {
      id: 4,
      name: "Women in Theology Grant",
      type: "Partial",
      applicants: 89,
      deadline: "2024-04-10",
      status: "Closed",
      amount: "$3,000",
    },
    {
      id: 5,
      name: "Postgraduate Thesis Fellowship",
      type: "Full Funding",
      applicants: 12,
      deadline: "2024-12-01",
      status: "Draft",
      amount: "$12,000",
    },
  ]);

  const filteredScholarships = scholarships.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="arimo-font text-sm text-neutral-800">
            Delete scholarship <b>{name}</b>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-neutral-500 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setScholarships(scholarships.filter((s) => s.id !== id));
                toast.dismiss(t.id);
                toast.success("Scholarship deleted");
              }}
              className="px-3 py-1 text-xs bg-rose-600 text-white rounded-md font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        className:
          "border border-black/10 rounded-xl shadow-lg bg-white p-4 min-w-[300px]",
      },
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700 border-green-200";
      case "Closed":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Draft":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Total Scholarships
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              12
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Active Applicants
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              1,245
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium arimo-font">
              Closing Soon
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 leading-tight">
              3
            </h3>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button className="bg-greenTeal hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold arimo-font transition-all shadow-md flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Scholarship
        </button>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-xl font-bold arimo-font">
              Scholarship Programs
            </h2>
            <p className="text-gray-500 text-sm font-normal arimo-font">
              Manage applications, funding and deadlines
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                className="w-full h-10 pl-10 pr-4 bg-zinc-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-greenTeal/20 focus:border-greenTeal transition-all text-sm arimo-font"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4 text-neutral-950" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-xl border border-black/5">
          <table className="w-full text-sm text-left arimo-font">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500 font-medium">
              <tr>
                <th className="py-4 px-6">Program Name</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Funding</th>
                <th className="py-4 px-6 text-center">Applicants</th>
                <th className="py-4 px-6">Deadline</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredScholarships.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 font-semibold text-neutral-900 max-w-[250px] truncate">
                    {s.name}
                  </td>
                  <td className="py-4 px-6 text-neutral-600">{s.type}</td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-greenTeal">
                      {s.amount}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {s.applicants}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral-500 italic">
                    {s.deadline}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${getStatusColor(s.status)}`}
                      >
                        {s.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-blue-600 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-green-600 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-black/5 text-neutral-400 hover:text-rose-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredScholarships.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 arimo-font italic">
              No scholarships found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;
