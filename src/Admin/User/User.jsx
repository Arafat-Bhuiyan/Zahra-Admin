import React, { useState } from "react";
import { Search, Filter, Eye, Trash2 } from "lucide-react";
import StudentTable from "./StudentTable";
import TeacherTable from "./TeacherTable";





const User = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      name: "Emma Wilson",
      email: "emma.w@email.com",
      courses: 5,
      joined: "2024-01-15",
      status: "active",
    },
    {
      name: "Michael Chen",
      email: "michael.c@email.com",
      courses: 0,
      joined: "2024-02-20",
      status: "active",
    },
    {
      name: "Sarah Parker",
      email: "sarah.p@email.com",
      courses: 0,
      joined: "2023-11-10",
      status: "active",
    },
    {
      name: "David Kim",
      email: "david.k@email.com",
      courses: 0,
      joined: "2024-03-05",
      status: "inactive",
    },
    {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      courses: 7,
      joined: "2023-09-12",
      status: "active",
    },
    {
      name: "James Rodriguez",
      email: "james.r@email.com",
      courses: 4,
      joined: "2024-01-22",
      status: "inactive",
    },
    {
      name: "Olivia Thompson",
      email: "olivia.t@email.com",
      courses: 5,
      joined: "2023-12-08",
      status: "active",
    },
    {
      name: "Robert Lee",
      email: "robert.l@email.com",
      courses: 6,
      joined: "2024-02-14",
      status: "active",
    },
  ];

  const teachers = [
    {
      name: "Dr. John Smith",
      email: "john.smith@school.com",
      department: "Mathematics",
      courses: 3,
      students: 245,
      status: "active",
    },
    {
      name: "Prof. Emily Brown",
      email: "emily.brown@school.com",
      department: "Science",
      courses: 4,
      students: 320,
      status: "active",
    },
    {
      name: "Dr. Marcus Johnson",
      email: "marcus.j@school.com",
      department: "English",
      courses: 2,
      students: 180,
      status: "active",
    },
    {
      name: "Dr. Anna Martinez",
      email: "anna.m@school.com",
      department: "History",
      courses: 3,
      students: 210,
      status: "active",
    },
    {
      name: "Prof. William Taylor",
      email: "will.t@school.com",
      department: "Arts",
      courses: 2,
      students: 150,
      status: "inactive",
    },
  ];

  const currentData = activeTab === "students" ? students : teachers;

  const filteredData = currentData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="pt-2 flex flex-col gap-6">
      <div className="flex justify-end w-full">
        <button className="bg-[#89A6A7] hover:bg-[#729394] text-white px-6 py-2 rounded-lg text-sm font-medium arimo-font transition-colors shadow-sm">
          Add User
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl border border-black/10 shadow-sm p-6 flex flex-col gap-7 min-h-[610px]">
        {/* Card Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-neutral-950 text-base font-normal arimo-font leading-4">
              All Users
            </h2>
            <p className="text-gray-500 text-base font-normal arimo-font leading-6">
              View and manage all platform users
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[256px]">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full h-9 pl-10 pr-3 py-1 bg-zinc-100 rounded-lg border-transparent focus:outline-none text-sm arimo-font text-gray-700 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-black/10 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-neutral-950" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="w-full h-9 bg-gray-200/50 rounded-2xl p-[3px] flex gap-1 items-center">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex-1 h-7 rounded-2xl flex items-center justify-center text-sm arimo-font transition-all ${
              activeTab === "students"
                ? "bg-white shadow-sm text-neutral-950 font-medium"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-gray-300/30"
            }`}
          >
            Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`flex-1 h-7 rounded-2xl flex items-center justify-center text-sm arimo-font transition-all ${
              activeTab === "teachers"
                ? "bg-white shadow-sm text-neutral-950 font-medium"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-gray-300/30"
            }`}
          >
            Teachers ({teachers.length})
          </button>
        </div>

        {/* Tables */}
        {activeTab === "students" ? (
          <StudentTable data={filteredData} />
        ) : (
          <TeacherTable data={filteredData} />
        )}

        {filteredData.length === 0 && (
          <div className="py-20 text-center text-gray-500 arimo-font w-full">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
