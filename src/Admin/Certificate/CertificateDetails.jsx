import React, { useState } from "react";
import { ArrowLeft, Search, Filter, Award, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
// import GenerateCertificateModal from "./GenerateCertificateModal";

const CourseDetailsStatsCard = ({ value, label, color }) => {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
    },
    gray: {
      bg: "bg-slate-400/10",
      text: "text-slate-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
  };

  const style = colorStyles[color];

  return (
    <div
      className={`flex-1 min-w-[200px] px-3 pt-3 pb-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-center gap-1 ${style.bg}`}
    >
      <div className={`text-2xl font-bold arimo-font ${style.text}`}>
        {value}
      </div>
      <div className="text-neutral-600 text-xs font-normal arimo-font text-center">
        {label}
      </div>
    </div>
  );
};

const StudentRow = ({ student, isSelected, onSelect }) => {
  const statusStyles = {
    Issued: {
      bg: "bg-green-100",
      border: "outline-green-200",
      dot: "outline-green-700",
      text: "text-green-700",
    },
    Eligible: {
      bg: "bg-yellow-100",
      border: "outline-yellow-200",
      dot: "outline-yellow-700",
      text: "text-yellow-700",
    },
  };

  const style = statusStyles[student.status] || statusStyles["Issued"];

  return (
    <div
      className={`w-full px-4 py-3 rounded-[10px] border ${isSelected ? "border-blue-300 bg-blue-50/30" : "border-neutral-200 bg-white"} hover:border-blue-300 transition-all flex items-center gap-4`}
    >
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(student.id)}
          className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
        />
      </div>

      <div className="w-10 h-10 bg-slate-400 rounded-full flex justify-center items-center text-white font-bold text-sm">
        {student.initials}
      </div>

      <div className="flex-1 flex flex-col">
        <span className="text-neutral-800 text-base font-bold arimo-font">
          {student.name}
        </span>
        <span className="text-neutral-500 text-sm font-normal arimo-font">
          {student.email}
        </span>
      </div>

      <div className="w-32 flex flex-col items-end mr-8">
        <span className="text-neutral-500 text-sm font-normal arimo-font">
          Completion
        </span>
        <span className="text-neutral-800 text-sm font-normal arimo-font">
          {student.completionDate}
        </span>
      </div>

      <div
        className={`w-24 h-7 rounded-full flex items-center px-1.5 gap-2 outline outline-1 outline-offset-[-1px] ${style.bg} ${style.border}`}
      >
        <div className="w-3 h-3 relative flex items-center justify-center">
          <div
            className={`w-2 h-2 rounded-full border-[1.5px] ${style.dot.replace("outline", "border")}`}
          ></div>
        </div>
        <span className={`text-xs font-bold arimo-font ${style.text}`}>
          {student.status}
        </span>
      </div>
    </div>
  );
};

const CertificateDetails = ({ selectedCourse, onBack }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emily Rodriguez",
      initials: "ER",
      email: "emily.r@email.com",
      completionDate: "Jan 5, 2026",
      status: "Issued",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      initials: "MJ",
      email: "marcus.j@email.com",
      completionDate: "Jan 8, 2026",
      status: "Issued",
    },
    {
      id: 3,
      name: "Sarah Chen",
      initials: "SC",
      email: "sarah.chen@email.com",
      completionDate: "Jan 10, 2026",
      status: "Eligible",
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      initials: "AH",
      email: "ahmed.h@email.com",
      completionDate: "Jan 12, 2026",
      status: "Eligible",
    },
    {
      id: 5,
      name: "Lisa Park",
      initials: "LP",
      email: "lisa.p@email.com",
      completionDate: "Jan 14, 2026",
      status: "Eligible",
    },
    {
      id: 6,
      name: "David Smith",
      initials: "DS",
      email: "david.s@email.com",
      completionDate: "Jan 15, 2026",
      status: "Issued",
    },
    {
      id: 7,
      name: "Maria Garcia",
      initials: "MG",
      email: "maria.g@email.com",
      completionDate: "Jan 16, 2026",
      status: "Issued",
    },
  ]);

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const selectedStudentObjects = students.filter((student) =>
    selectedStudents.includes(student.id),
  );

  const handleGenerateClick = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student.");
      return;
    }
    setIsGenerateModalOpen(true);
  };

  const handleGenerateConfirm = (data) => {
    // Here you would typically make an API call with the data
    console.log("Generating certificates:", {
      students: selectedStudents,
      ...data,
    });

    // Update status to Issued for selected students
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        selectedStudents.includes(student.id)
          ? { ...student, status: "Issued" }
          : student,
      ),
    );

    toast.success(
      `Certificates sent to ${selectedStudents.length} student emails successfully!`,
    );
    setSelectedStudents([]);
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 space-y-8 animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors pl-1"
      >
        <ArrowLeft size={20} />
        <span className="text-base font-normal arimo-font">
          Back to Courses
        </span>
      </button>

      {/* Header & Action */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-neutral-800 text-2xl font-bold arimo-font">
            {selectedCourse.title}
          </h1>
          <p className="text-neutral-500 text-sm font-normal arimo-font mt-1">
            Instructor: {selectedCourse.instructor}
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="flex gap-4 w-full">
        <CourseDetailsStatsCard
          value={selectedCourse.totalStudents}
          label="Total Enrolled"
          color="blue"
        />
        <CourseDetailsStatsCard
          value={selectedCourse.completed}
          label="Completed Course"
          color="green"
        />
        <CourseDetailsStatsCard
          value={28}
          label="Certificates Issued"
          color="gray"
        />
        <CourseDetailsStatsCard
          value={3}
          label="Eligible for Certificate"
          color="yellow"
        />
      </div>

      {/* Action Bar (Moved) */}
      {selectedStudents.length > 0 && (
        <div className="w-full h-16 bg-white rounded-xl shadow-sm border border-neutral-200 px-8 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 text-lg">Selected Students:</span>
            <span className="text-neutral-800 text-2xl font-bold">
              {selectedStudents.length}
            </span>
          </div>
          <button
            onClick={handleGenerateClick}
            className="bg-slate-400 hover:bg-slate-500 text-white px-6 py-2.5 rounded-[10px] font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <Award size={18} />
            Generate Certificates
          </button>
        </div>
      )}

      {/* Students List Container */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <h2 className="text-neutral-800 text-lg font-bold arimo-font">
            Students
          </h2>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative w-[400px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-[10px] border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            {selectedStudents.length > 0 && (
              <button
                onClick={handleDeselectAll}
                className="flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-600 border border-neutral-200 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95"
              >
                <RotateCcw size={18} />
                Deselect
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {students
            .filter(
              (student) =>
                student.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                isSelected={selectedStudents.includes(student.id)}
                onSelect={handleSelectStudent}
              />
            ))}
        </div>
      </div>

      {/* <GenerateCertificateModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        selectedStudents={selectedStudentObjects}
        onGenerate={handleGenerateConfirm}
      /> */}
    </div>
  );
};

export default CertificateDetails;
