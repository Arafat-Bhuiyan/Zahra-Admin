import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import StudentTable from "./StudentTable";
import TeacherTable from "./TeacherTable";
import TeacherDetails from "./TeacherDetails";
import AddUserModal from "./AddUserModal";
import toast from "react-hot-toast";

const User = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      courses: 5,
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      courses: 0,
      joined: "2024-02-20",
    },
    {
      id: 3,
      name: "Sarah Parker",
      email: "sarah.p@email.com",
      courses: 0,
      joined: "2023-11-10",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@email.com",
      courses: 0,
      joined: "2024-03-05",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      courses: 7,
      joined: "2023-09-12",
    },
    {
      id: 6,
      name: "James Rodriguez",
      email: "james.r@email.com",
      courses: 4,
      joined: "2024-01-22",
    },
    {
      id: 7,
      name: "Olivia Thompson",
      email: "olivia.t@email.com",
      courses: 5,
      joined: "2023-12-08",
    },
    {
      id: 8,
      name: "Robert Lee",
      email: "robert.l@email.com",
      courses: 6,
      joined: "2024-02-14",
    },
  ]);

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@school.com",
      department: "Mathematics",
      courses: 3,
      students: 245,
    },
    {
      id: 2,
      name: "Prof. Emily Brown",
      email: "emily.brown@school.com",
      department: "Science",
      courses: 4,
      students: 320,
    },
    {
      id: 3,
      name: "Dr. Marcus Johnson",
      email: "marcus.j@school.com",
      department: "English",
      courses: 2,
      students: 180,
    },
    {
      id: 4,
      name: "Dr. Anna Martinez",
      email: "anna.m@school.com",
      department: "History",
      courses: 3,
      students: 210,
    },
    {
      id: 5,
      name: "Prof. William Taylor",
      email: "will.t@school.com",
      department: "Arts",
      courses: 2,
      students: 150,
    },
  ]);

  const currentData = activeTab === "students" ? students : teachers;

  const filteredData = currentData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleTeacherView = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleBackToList = () => {
    setSelectedTeacher(null);
  };

  const handleAddUser = (userData) => {
    if (activeTab === "students") {
      setStudents((prev) => [userData, ...prev]);
      toast.success(`Student ${userData.name} added successfully!`);
    } else {
      setTeachers((prev) => [userData, ...prev]);
      toast.success(`Teacher ${userData.name} added successfully!`);
    }
  };

  const confirmDelete = (userId, name) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="arimo-font text-sm text-neutral-800">
            Are you sure you want to delete <b>{name}</b>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(userId);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 text-xs bg-rose-600 text-white rounded-md hover:bg-rose-700 font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        className:
          "border border-black/10 rounded-xl shadow-lg bg-white p-4 min-w-[300px]",
      },
    );
  };

  const handleDelete = (userId) => {
    if (activeTab === "students") {
      setStudents(students.filter((s) => s.id !== userId));
      toast.success("Student removed successfully", { duration: 3000 });
    } else {
      setTeachers(teachers.filter((t) => t.id !== userId));
      toast.success("Teacher removed successfully", { duration: 3000 });
    }
  };

  // Render the details view if a teacher is selected
  if (selectedTeacher) {
    return (
      <TeacherDetails teacher={selectedTeacher} onBack={handleBackToList} />
    );
  }

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex justify-end w-full">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#89A6A7] hover:bg-[#729394] text-white px-6 py-2 rounded-lg text-sm font-medium arimo-font transition-colors shadow-sm"
        >
          Add {activeTab === "students" ? "Student" : "Teacher"}
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
          <StudentTable data={filteredData} onDelete={confirmDelete} />
        ) : (
          <TeacherTable
            data={filteredData}
            onView={handleTeacherView}
            onDelete={confirmDelete}
          />
        )}

        {filteredData.length === 0 && (
          <div className="py-20 text-center text-gray-500 arimo-font w-full">
            No users found matching your search.
          </div>
        )}
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type={activeTab}
        onAdd={handleAddUser}
      />
    </div>
  );
};

export default User;
