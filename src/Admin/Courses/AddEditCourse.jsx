import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Upload,
  Save,
  ChevronLeft,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  User,
  Tag,
  Play,
  CheckCircle2,
  AlertCircle,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import CourseCurriculum from "./CourseCurriculum";

const AddEditCourse = ({ course, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState("Course Overview");
  const tabs = ["Course Overview", "Course Curriculum"];

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    instructor: "",
    category: "Mental Health",
    status: "Upcoming",
    price: "99",
    duration: "12",
    level: "Beginner",
    lessons: "24",
    totalHours: "",
    sessionDuration: "",
    image: null,
    imagePreview: null,
    video: null,
    videoName: "",
    learningObjectives: [
      "Integrate daily mindfulness practices rooted in Islamic tradition",
      "Develop emotional awareness and self-compassion through Quranic principles",
    ],
    requirements: [
      "Basic understanding of Islamic principles",
      "Commitment to daily practice (15-20 minutes)",
    ],
    curriculum: [
      {
        id: 1,
        title: "Getting Started",
        lessons: [
          {
            id: 101,
            title: "Course Overview & Welcome",
            type: "video",
            duration: "05:45",
          },
          {
            id: 102,
            title: "How to get the most out of this course",
            type: "video",
            duration: "08:20",
          },
          {
            id: 103,
            title: "Learning Materials & Resources",
            type: "document",
          },
        ],
      },
    ],
    startDate: "",
  });

  const [newObjective, setNewObjective] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        imagePreview: course.image,
        subtitle: course.subtitle || "",
        description: course.description || "",
        level: course.level || "Beginner",
        videoName: course.videoName || "",
        learningObjectives: course.learningObjectives || [],
        requirements: course.requirements || [],
        curriculum: course.curriculum || [],
        startDate: course.startDate || "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurriculumChange = (newCurriculum) => {
    setFormData((prev) => ({ ...prev, curriculum: newCurriculum }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        video: file,
        videoName: file.name,
      }));
    }
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, newObjective.trim()],
      }));
      setNewObjective("");
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }));
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-stone-50 rounded-xl text-stone-500 transition-all border border-transparent hover:border-stone-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-greenTeal tracking-tight font-['Arimo']">
              {course ? "Edit Course" : "Course Builder"}
            </h1>
            <p className="text-stone-500 font-medium tracking-wide text-sm font-['Arimo']">
              {course
                ? "Update existing course content"
                : "Create comprehensive course content"}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-greenTeal text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{course ? "Save Changes" : "Publish Course"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Course Overview" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Basic Information */}
          <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Basic Information
            </div>

            <div className="space-y-6">
              <FormGroup label="Course Title">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Mindfulness in Islam"
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
              </FormGroup>

              <FormGroup label="Course Subtitle">
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Faith-centered emotional healing journey"
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
              </FormGroup>

              <FormGroup label="Course Description">
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of what students will learn..."
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800 resize-none"
                />
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormGroup label="Price ($)">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="99"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none"
                  />
                </FormGroup>
                <FormGroup label="Duration (weeks)">
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="12"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none"
                  />
                </FormGroup>
                <FormGroup label="Level">
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </FormGroup>
                <FormGroup label="Category">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer"
                  >
                    <option>Mental Health</option>
                    <option>Spiritual Growth</option>
                    <option>Relationships</option>
                    <option>Professional</option>
                  </select>
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup label="Status">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer font-bold text-stone-800"
                  >
                    <option>Upcoming</option>
                    <option>Running</option>
                    <option>Recorded</option>
                  </select>
                </FormGroup>
                {formData.status === "Upcoming" && (
                  <FormGroup label="Start Date">
                    <input
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      placeholder="e.g. May 10, 2026"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none font-bold text-stone-800"
                    />
                  </FormGroup>
                )}
                <FormGroup label="Assign Teacher">
                  <select
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Teacher</option>
                    <option>Dr. Ahmed Hassan</option>
                    <option>Dr. Yasir Qadhi</option>
                    <option>Fatima Rahman</option>
                  </select>
                </FormGroup>
                <FormGroup label="Lessons">
                  <input
                    type="number"
                    name="lessons"
                    value={formData.lessons}
                    onChange={handleChange}
                    placeholder="24"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none"
                  />
                </FormGroup>
              </div>
            </div>
          </section>

          {/* Course Images & Preview */}
          <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Course Images & Preview
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadCard
                title="Course Thumbnail"
                subtitle="1200x675px (JPG, PNG)"
                icon={<ImageIcon className="w-8 h-8 text-stone-400" />}
                btnText="Upload Image"
                onChange={handleImageUpload}
                accept="image/*.jpg,image/*.jpeg,image/*.png"
                preview={formData.imagePreview}
              />
              <UploadCard
                title="Course Preview Video"
                subtitle="MP4, MOV (Max 2 min)"
                icon={<Play className="w-8 h-8 text-stone-400" />}
                btnText="Upload Video"
                onChange={handleVideoUpload}
                accept="video/*"
                preview={formData.videoName}
              />
            </div>
          </section>

          {/* What You'll Learn */}
          <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs inter-font">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              What You'll Learn
            </div>

            <div className="space-y-4">
              {formData.learningObjectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <p className="flex-1 text-sm font-medium text-stone-800 leading-relaxed inter-font">
                    {obj}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeObjective(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all transform active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Add a learning objective..."
                  className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none inter-font focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
                <button
                  type="button"
                  onClick={addObjective}
                  className="w-12 h-12 flex items-center justify-center bg-greenTeal text-white rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-xs inter-font">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              Requirements
            </div>

            <div className="space-y-4">
              {formData.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 group"
                >
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="flex-1 text-sm font-medium text-stone-800 leading-relaxed inter-font">
                    {req}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeRequirement(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all transform active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a requirement..."
                  className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none inter-font focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="w-12 h-12 flex items-center justify-center bg-greenTeal text-white rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === "Course Curriculum" && (
        <CourseCurriculum
          modules={formData.curriculum}
          onModulesChange={handleCurriculumChange}
        />
      )}
    </div>
  );
};

const FormGroup = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-stone-800 ml-1 inter-font">
      {label}
    </label>
    {children}
  </div>
);

const UploadCard = ({
  title,
  subtitle,
  icon,
  btnText,
  onChange,
  accept,
  preview,
}) => {
  const fileInputRef = useRef(null);

  const isDataImage =
    preview && typeof preview === "string" && preview.startsWith("data:image");
  const isUrlImage =
    preview && typeof preview === "string" && preview.includes("://");

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-stone-200 rounded-3xl hover:border-teal-400 hover:bg-teal-50/10 transition-all group cursor-pointer relative overflow-hidden h-64"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        accept={accept}
        className="hidden"
      />

      {isDataImage || isUrlImage ? (
        <div className="absolute inset-0 z-0">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm border border-stone-100 group-hover:bg-white group-hover:border-teal-100">
          {icon}
        </div>
        <div className="text-center">
          <h4 className="text-greenTeal font-bold inter-font">{title}</h4>
          <p className="text-stone-400 text-xs mt-1 inter-font max-w-[240px] line-clamp-1">
            {preview &&
            typeof preview === "string" &&
            !preview.includes("://") &&
            !preview.startsWith("data:")
              ? `Selected: ${preview}`
              : subtitle}
          </p>
        </div>
        <button className="bg-white border border-stone-200 px-6 py-2 rounded-xl text-stone-600 font-bold text-sm shadow-sm hover:border-teal-200 hover:text-teal-600 transition-all active:scale-95">
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default AddEditCourse;
