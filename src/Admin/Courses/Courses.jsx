import React, { useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Users,
  Video,
  Eye,
  Pencil,
  Calendar,
  Clock,
  LayoutGrid,
  List,
  ChevronDown,
  Filter,
} from "lucide-react";
import CourseDetailsModal from "./CourseDetailsModal";
import AddEditCourse from "./AddEditCourse";
import CourseBuilder from "./CourseBuilder";
import LiveSessions from "./LiveSessions";

const Courses = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeView, setActiveView] = useState("listing"); // listing, add-edit, builder, live-sessions
  const [courseToEdit, setCourseToEdit] = useState(null);

  const categories = [
    "All",
    "Mental Health",
    "Spiritual Growth",
    "Relationships",
    "Professional",
  ];
  const statuses = ["All", "Live", "Recorded", "Upcoming"];

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Tafsir Al-Quran: Understanding Divine Messages",
      subtitle: "A journey through the meanings of the Holy Quran",
      description:
        "This course provides a comprehensive understanding of the Quranic messages and their application in modern life.",
      instructor: "Dr. Ahmed Hassan",
      category: "Mental Health",
      status: "Upcoming",
      lessons: 24,
      duration: "12 weeks",
      totalHours: 12,
      sessionDuration: "2hr per session",
      price: "$99",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop",
      level: "Intermediate",
      learningObjectives: [
        "Understand core Quranic themes",
        "Learn historical context",
        "Reflect on divine messages",
      ],
      requirements: [
        "Basic understanding of Islam",
        "Stable internet connection",
      ],
      curriculum: [
        {
          id: 1,
          title: "Introduction to Tafsir",
          lessons: [
            {
              id: 101,
              title: "What is Tafsir?",
              type: "video",
              duration: "10:00",
            },
            {
              id: 102,
              title: "Principles of Interpretation",
              type: "document",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Mindfulness in Islam",
      subtitle: "Faith-centered emotional healing journey",
      description:
        "Learn how to combine Islamic principles with modern mindfulness techniques for emotional wellbeing.",
      instructor: "Dr. Ahmed Hassan",
      category: "Mental Health",
      status: "Live",
      lessons: 24,
      duration: "12 weeks",
      totalHours: 12,
      sessionDuration: "2hr per session",
      price: "$99",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2824&auto=format&fit=crop",
      level: "Beginner",
      learningObjectives: [
        "Master Islamic meditation",
        "Manage stress through faith",
        "Build emotional resilience",
      ],
      requirements: ["None, open to all"],
    },
    {
      id: 3,
      title: "Spiritual Growth Mastery",
      subtitle: "Elevate your soul through daily practices",
      description:
        "A deep dive into the spiritual dimensions of Islam and how to cultivate a closer relationship with Allah.",
      instructor: "Dr. Ahmed Hassan",
      category: "Mental Health",
      status: "Recorded",
      lessons: 24,
      duration: "12 weeks",
      totalHours: 12,
      sessionDuration: "2hr per session",
      price: "$99",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2800&auto=format&fit=crop",
      level: "Advanced",
      learningObjectives: [
        "Develop consistent spiritual habits",
        "Understand Tazkiyah-al-Nafs",
        "Overcome spiritual plateaus",
      ],
      requirements: ["Completion of Foundation course"],
    },
    {
      id: 4,
      title: "Foundation of Islamic Ethics",
      subtitle: "Building character based on prophetic tradition",
      description:
        "Explore the ethical framework of Islam and how it shapes personal and professional conduct.",
      instructor: "Dr. Yasir Qadhi",
      category: "Spiritual Growth",
      status: "Recorded",
      lessons: 18,
      duration: "10 weeks",
      totalHours: 15,
      sessionDuration: "1.5hr per session",
      price: "$79",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop",
      level: "Beginner",
      learningObjectives: [
        "Identify core Islamic values",
        "Apply ethics in daily life",
        "Study prophetic character",
      ],
      requirements: ["Basic literacy"],
    },
  ]);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || c.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  const handleAddCourse = () => {
    setCourseToEdit(null);
    setActiveView("add-edit");
  };

  const handleEditCourse = (course) => {
    setCourseToEdit(course);
    setActiveView("add-edit");
  };

  const handleOpenBuilder = (course) => {
    setSelectedCourse(course);
    setActiveView("builder");
  };

  const handleSaveCourse = (formData) => {
    if (courseToEdit) {
      // Edit existing course
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseToEdit.id
            ? { ...formData, id: c.id, image: formData.imagePreview }
            : c,
        ),
      );
    } else {
      // Add new course
      const newCourse = {
        ...formData,
        id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
        image: formData.imagePreview || "https://placehold.co/360x219",
      };
      setCourses((prev) => [...prev, newCourse]);
    }
    setActiveView("listing");
    setCourseToEdit(null);
  };

  if (activeView === "add-edit") {
    return (
      <AddEditCourse
        course={courseToEdit}
        onBack={() => setActiveView("listing")}
        onSave={handleSaveCourse}
      />
    );
  }

  if (activeView === "builder") {
    return (
      <CourseBuilder
        course={selectedCourse}
        onBack={() => setActiveView("listing")}
      />
    );
  }

  if (activeView === "live-sessions") {
    return <LiveSessions onBack={() => setActiveView("listing")} />;
  }

  return (
    <div className="pt-2 flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
        {/* <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
            Avg Rating
          </p>
          <h4 className="text-2xl font-bold text-neutral-900">4.8</h4>
        </div> */}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <button
          onClick={() => setActiveView("live-sessions")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold arimo-font transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Video className="w-5 h-5" />
          Live
        </button>
        <button
          onClick={handleAddCourse}
          className="bg-greenTeal hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold arimo-font transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-12 z-20">
        {/* Category Filter */}
        <div className="flex flex-col gap-3 relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 text-stone-700 hover:text-teal-700 transition-colors group"
          >
            <Filter className="w-4 h-4 text-stone-500 group-hover:text-teal-600" />
            <span className="text-sm font-bold font-['Arial'] leading-5 tracking-wide">
              CATEGORY
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-8 left-0 mt-2 p-5 bg-white border border-stone-100 rounded-[1.5rem] shadow-2xl flex flex-col gap-1 min-w-[220px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${
                    selectedCategory === cat
                      ? "bg-teal-50 text-teal-700 font-bold"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-b from-teal-600 to-cyan-900 text-white shadow-md scale-105"
                    : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-3 relative">
          <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center gap-2 text-stone-700 hover:text-teal-700 transition-colors group"
          >
            <Filter className="w-4 h-4 text-stone-500 group-hover:text-teal-600" />
            <span className="text-sm font-bold font-['Arial'] leading-5 tracking-wide">
              STATUS
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isStatusOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isStatusOpen && (
            <div className="absolute top-8 left-0 mt-2 p-5 bg-white border border-stone-100 rounded-[1.5rem] shadow-2xl flex flex-col gap-1 min-w-[180px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => {
                    setSelectedStatus(stat);
                    setIsStatusOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${
                    selectedStatus === stat
                      ? "bg-teal-50 text-teal-700 font-bold"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {statuses.map((stat) => (
              <button
                key={stat}
                onClick={() => setSelectedStatus(stat)}
                className={`px-6 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedStatus === stat
                    ? "bg-gradient-to-b from-teal-600 to-cyan-900 text-white shadow-md scale-105"
                    : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 tracking-tight">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[2rem] border border-stone-200 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 w-full p-4">
                <div className="absolute top-6 right-8 z-10 px-4 py-1.5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-2xl text-stone-700 text-xs font-medium shadow-sm">
                  {c.category}
                </div>
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>

              <div className="px-6 pb-6 flex flex-col gap-5 flex-grow">
                {/* Status Badge */}
                <div className="flex">
                  <span
                    className={`px-4 py-1.5 rounded-[20px] text-xs font-semibold text-white flex items-center gap-2 ${
                      c.status === "Upcoming"
                        ? "bg-lime-600"
                        : c.status === "Live"
                          ? "bg-red-700"
                          : "bg-sky-500"
                    }`}
                  >
                    {c.status === "Live" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                    )}
                    {c.status}
                  </span>
                </div>

                {/* Title and Instructor */}
                <div className="space-y-2">
                  <h4 className="text-stone-900 text-xl font-bold leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-teal-700 transition-colors">
                    {c.title}
                  </h4>
                  <div className="flex items-center gap-2 text-stone-600">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{c.instructor}</span>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                  <div className="flex items-center gap-2 text-stone-500 bg-stone-50 p-2 rounded-xl">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      {c.lessons} Lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 bg-stone-50 p-2 rounded-xl">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      {c.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 bg-stone-50 p-2 rounded-xl">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      {c.totalHours} hr
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 bg-stone-50 p-2 rounded-xl">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold whitespace-nowrap line-clamp-1">
                      {c.sessionDuration}
                    </span>
                  </div>
                </div>

                {/* Footer: Price and Actions */}
                <div className="pt-5 border-t border-stone-100 flex items-center justify-between mt-auto">
                  <span className="text-teal-800 text-2xl font-black">
                    {c.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCourse(c)}
                      className="w-10 h-10 bg-white rounded-xl border border-stone-200 flex justify-center items-center text-stone-400 hover:text-teal-600 hover:border-teal-600 hover:bg-teal-50 transition-all shadow-sm"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleViewCourse(c)}
                      className="w-10 h-10 bg-white rounded-xl border border-stone-200 flex justify-center items-center text-stone-400 hover:text-teal-600 hover:border-teal-600 hover:bg-teal-50 transition-all shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenBuilder(c)}
                      className="w-10 h-10 bg-white rounded-xl border border-stone-200 flex justify-center items-center text-stone-400 hover:text-teal-600 hover:border-teal-600 hover:bg-teal-50 transition-all shadow-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </div>
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
                <th className="py-4 px-6 text-center">Lessons</th>
                <th className="py-4 px-6 text-center">Duration</th>
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
                      className="w-12 h-8 rounded-lg object-cover border border-black/5"
                    />
                    <span className="text-neutral-950 font-bold">
                      {c.title}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral-600">{c.instructor}</td>
                  <td className="py-4 px-6 text-center text-neutral-600">
                    {c.lessons}
                  </td>
                  <td className="py-4 px-6 text-center text-neutral-600">
                    {c.duration}
                  </td>
                  <td className="py-4 px-6 font-bold">{c.price}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-[20px] text-[10px] font-bold uppercase ${
                          c.status === "Upcoming"
                            ? "bg-lime-600 text-white"
                            : c.status === "Live"
                              ? "bg-red-700 text-white"
                              : "bg-sky-500 text-white"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditCourse(c)}
                        className="p-1.5 hover:bg-gray-100 rounded text-slate-400"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleViewCourse(c)}
                        className="p-1.5 hover:bg-gray-100 rounded text-slate-400"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenBuilder(c)}
                        className="p-1.5 hover:bg-gray-100 rounded text-slate-400"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <CourseDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default Courses;
