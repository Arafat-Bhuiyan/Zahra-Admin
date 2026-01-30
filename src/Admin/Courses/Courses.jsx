import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  BookOpen,
  Clock,
  Users,
  Star,
  MoreVertical,
  LayoutGrid,
  List,
} from "lucide-react";

const Courses = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Foundations of Islamic Psychology",
      instructor: "Dr. Laleh Bakhtiar",
      category: "Psychology",
      students: 450,
      rating: 4.8,
      duration: "12 Weeks",
      price: "$199",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1532012197367-2bb673c24237?q=80&w=300&h=200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Advanced Arabic Linguistics II",
      instructor: "Prof. Ahmed Mansour",
      category: "Language",
      students: 120,
      rating: 4.5,
      duration: "8 Weeks",
      price: "$149",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024adb0?q=80&w=300&h=200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Theology of the Soul",
      instructor: "Sheikh Omar Suleiman",
      category: "Theology",
      students: 2300,
      rating: 4.9,
      duration: "Self-Paced",
      price: "Free",
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1544924467-9c938bb0ca13?q=80&w=300&h=200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Islamic Ethics in Modern Business",
      instructor: "Dr. Yasir Qadhi",
      category: "Business",
      students: 890,
      rating: 4.7,
      duration: "6 Weeks",
      price: "$89",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1454165833767-0270b24bbbad?q=80&w=300&h=200&auto=format&fit=crop",
    },
  ]);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-neutral-900 text-3xl font-bold arimo-font tracking-tight">
            Courses Management
          </h1>
          <p className="text-gray-500 text-base font-normal arimo-font">
            Create, edit and manage your curriculum
          </p>
        </div>
        <button className="bg-greenTeal hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold arimo-font transition-all shadow-md flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Total Courses
          </p>
          <h4 className="text-2xl font-bold text-neutral-900">48</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Enrollments
          </p>
          <h4 className="text-2xl font-bold text-neutral-900">12.5k</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Completion Rate
          </p>
          <h4 className="text-2xl font-bold text-neutral-900">86%</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Avg Rating
          </p>
          <h4 className="text-2xl font-bold text-neutral-900">4.8</h4>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by course title or instructor..."
            className="w-full h-10 pl-10 pr-4 bg-zinc-50 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-greenTeal/20 focus:border-greenTeal transition-all text-sm arimo-font"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-xl border border-black/10 hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            Categories
          </button>

          <div className="h-10 w-[1px] bg-gray-200 hidden md:block mx-1"></div>

          <div className="flex bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-greenTeal" : "text-gray-400 hover:text-gray-600"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-greenTeal" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 tracking-tight">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden group hover:shadow-md transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border bg-white/90 backdrop-blur-sm shadow-sm ${c.status === "Published" ? "text-emerald-600 border-emerald-100" : "text-amber-600 border-amber-100"}`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-greenTeal text-[10px] font-bold uppercase tracking-widest">
                    {c.category}
                  </p>
                  <h4 className="text-neutral-950 font-bold text-base leading-tight line-clamp-2 min-h-[3rem]">
                    {c.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 border border-black/5 flex items-center justify-center text-[10px] font-bold">
                    IB
                  </div>
                  <p className="text-gray-500 text-xs font-medium truncate">
                    {c.instructor}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500 text-xs font-medium">
                      {c.students}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-gray-950 text-xs font-bold">
                      {c.rating}
                    </span>
                  </div>
                  <p className="text-neutral-900 font-bold text-sm">
                    {c.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <table className="w-full text-sm text-left arimo-font font-medium">
            <thead className="bg-zinc-50 border-b border-black/5 text-neutral-500">
              <tr>
                <th className="py-4 px-6">Course Name</th>
                <th className="py-4 px-6">Instructor</th>
                <th className="py-4 px-6 text-center">Rating</th>
                <th className="py-4 px-6 text-center">Students</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredCourses.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-zinc-50/50 transition-colors"
                >
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={c.image}
                      className="w-10 h-7 rounded object-cover border border-black/5"
                    />
                    <span className="text-neutral-950 font-bold">
                      {c.title}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral-600">{c.instructor}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{c.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-blue-600 bg-blue-50/20">
                    {c.students}
                  </td>
                  <td className="py-4 px-6 font-bold">{c.price}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${c.status === "Published" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-neutral-400 hover:text-neutral-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Courses;
