import React, { useState } from "react";
import { Search, Trash2, Filter, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const SubscribersList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      status: "Active",
      date: "2026-01-11",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen99@example.com",
      status: "Inactive",
      date: "2026-01-12",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      status: "Active",
      date: "2026-01-13",
    },
    {
      id: 4,
      name: "James Rodriguez",
      email: "james.rod@example.com",
      status: "Active",
      date: "2026-01-14",
    },
    {
      id: 5,
      name: "Lisa Patel",
      email: "lisa.patel@example.com",
      status: "Inactive",
      date: "2026-01-15",
    },
  ]);

  const handleRemoveSubscriber = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this subscriber?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
                toast.dismiss(t.id);
                toast.success("Subscriber removed successfully", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "350px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    );
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#7BA0A0]/20"
          />
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-bold text-neutral-500">
            {filteredSubscribers.length} Total Subscribers
          </span>

          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-sm font-bold bg-white border border-neutral-200 text-neutral-600 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Filter size={16} />
              <span>{statusFilter}</span>
              <ChevronDown size={14} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 overflow-hidden">
                {["All", "Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      statusFilter === status
                        ? "text-[#7BA0A0] font-bold"
                        : "text-neutral-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-50">
            <tr className="text-neutral-500 text-sm font-bold border-b border-neutral-200">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Subscribed At</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredSubscribers.map((subscriber) => (
              <tr
                key={subscriber.id}
                className="hover:bg-neutral-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-neutral-800">
                  {subscriber.name}
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {subscriber.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                      subscriber.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {subscriber.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-500 text-sm">
                  {subscriber.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleRemoveSubscriber(subscriber.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
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

export default SubscribersList;
