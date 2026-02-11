import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowLeft,
  Search,
  Filter,
  Award,
  RotateCcw,
  Eye,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateTemplate1HTML from "./Templates/CertificateTemplate1HTML";
import CertificateTemplate2HTML from "./Templates/CertificateTemplate2HTML";
import CertificateTemplate3HTML from "./Templates/CertificateTemplate3HTML";
import CertificateTemplate4HTML from "./Templates/CertificateTemplate4HTML";
import CertificateTemplate5HTML from "./Templates/CertificateTemplate5HTML";
import CertificateTemplate6HTML from "./Templates/CertificateTemplate6HTML";
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
  const certificateRef = useRef(null);

  const [templates] = useState([
    {
      id: "template1",
      name: "Certificate Template 1",
      component: CertificateTemplate1HTML,
    },
    {
      id: "template2",
      name: "Certificate Template 2",
      component: CertificateTemplate2HTML,
    },
    {
      id: "template3",
      name: "Certificate Template 3",
      component: CertificateTemplate3HTML,
    },
    {
      id: "template4",
      name: "Certificate Template 4",
      component: CertificateTemplate4HTML,
    },
    {
      id: "template5",
      name: "Certificate Template 5",
      component: CertificateTemplate5HTML,
    },
    {
      id: "template6",
      name: "Certificate Template 6",
      component: CertificateTemplate6HTML,
    },
  ]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("template1");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

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
    generateCertificates();
  };

  const generateCertificates = async () => {
    try {
      for (const student of selectedStudentObjects) {
        // Create a temporary container
        const tempContainer = document.createElement("div");
        tempContainer.id = `cert-${student.id}`;
        tempContainer.style.position = "fixed";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.style.width = "297mm";
        tempContainer.style.height = "210mm";
        document.body.appendChild(tempContainer);

        // Render the template
        const SelectedTemplate = selectedTemplate.component;
        const certificateElement = (
          <SelectedTemplate
            studentName={student.name}
            courseTitle={selectedCourse.title}
            instructorName={selectedCourse.instructor}
            directorName="Dr. Abdul Rahman"
            date={new Date().toLocaleDateString()}
          />
        );

        // Use ReactDOM to render temporarily
        const root = ReactDOM.createRoot(tempContainer);
        root.render(certificateElement);

        // Wait for render
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Capture canvas
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          allowTaint: true,
        });

        // Create PDF
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const imgData = canvas.toDataURL("image/png");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Save PDF
        const fileName = `${student.name.replace(/\s+/g, "_")}_Certificate.pdf`;
        pdf.save(fileName);

        // Clean up
        root.unmount();
        document.body.removeChild(tempContainer);
      }

      // Update status to Issued for selected students
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          selectedStudents.includes(student.id)
            ? { ...student, status: "Issued" }
            : student,
        ),
      );

      toast.success(
        `Certificates generated for ${selectedStudents.length} student(s)!`,
      );
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error generating certificates:", error);
      toast.error("Error generating certificates. Please try again.");
    }
  };

  const generateSingleCertificate = async (student) => {
    try {
      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.id = `cert-preview-${student.id}`;
      tempContainer.style.position = "fixed";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.width = "297mm";
      tempContainer.style.height = "210mm";
      document.body.appendChild(tempContainer);

      // Render the template
      const SelectedTemplate = selectedTemplate.component;
      const certificateElement = (
        <SelectedTemplate
          studentName={student.name}
          courseTitle={selectedCourse.title}
          instructorName={selectedCourse.instructor}
          directorName="Dr. Abdul Rahman"
          date={new Date().toLocaleDateString()}
        />
      );

      // Use ReactDOM to render temporarily
      const root = ReactDOM.createRoot(tempContainer);
      root.render(certificateElement);

      // Wait for render
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Capture canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save PDF
      const fileName = `${student.name.replace(/\s+/g, "_")}_Certificate.pdf`;
      pdf.save(fileName);

      // Clean up
      root.unmount();
      document.body.removeChild(tempContainer);

      toast.success(`Certificate generated for ${student.name}!`);
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Error generating certificate. Please try again.");
    }
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
        <div className="flex flex-col gap-1 min-w-[280px]">
          <label className="text-neutral-500 text-xs font-bold uppercase arimo-font">
            Certificate Template
          </label>
          <div className="flex gap-2">
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all cursor-pointer"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-600 hover:bg-slate-50 hover:text-greenTeal transition-all shadow-sm group active:scale-95"
              title="Preview Template"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex flex-col">
                <h3 className="text-neutral-800 text-lg font-bold arimo-font">
                  Template Preview: {selectedTemplate.name}
                </h3>
                <p className="text-neutral-500 text-xs font-normal arimo-font">
                  Previewing with placeholder data
                </p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 bg-neutral-100 p-4 overflow-auto">
              <div className="flex justify-center">
                <div
                  className="bg-white rounded-lg shadow-lg border"
                  style={{
                    width: "297mm",
                    height: "210mm",
                    transform: "scale(0.5)",
                    transformOrigin: "top center",
                  }}
                >
                  <selectedTemplate.component
                    studentName="Sample Student Name"
                    courseTitle={selectedCourse.title}
                    instructorName={selectedCourse.instructor}
                    directorName="Elzahraa Hossain"
                    date={new Date().toLocaleDateString()}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-neutral-100 flex justify-between bg-slate-50">
              <button
                onClick={async () => {
                  const previewDiv = document.querySelector("[style*='297mm']");
                  if (previewDiv) {
                    try {
                      const canvas = await html2canvas(previewDiv, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: "#ffffff",
                        allowTaint: true,
                      });

                      const pdf = new jsPDF({
                        orientation: "landscape",
                        unit: "mm",
                        format: "a4",
                      });

                      const imgData = canvas.toDataURL("image/png");
                      const pageWidth = pdf.internal.pageSize.getWidth();
                      const imgHeight =
                        (canvas.height * pageWidth) / canvas.width;

                      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
                      pdf.save("Certificate_Preview.pdf");

                      toast.success("Certificate downloaded successfully!");
                    } catch (error) {
                      console.error("Error downloading certificate:", error);
                      toast.error("Failed to download certificate");
                    }
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="bg-greenTeal text-white px-8 py-2.5 rounded-xl font-bold hover:bg-greenTeal/80 transition-all active:scale-95"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Stats */}
      {/* <div className="flex gap-4 w-full">
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
      </div> */}

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
            className="bg-greenTeal hover:bg-greenTeal/80 text-white px-6 py-2.5 rounded-[10px] font-bold shadow-sm transition-colors flex items-center gap-2"
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
