import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Save,
  Upload,
  Video,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import CourseCurriculum from "./CourseCurriculum";
import CommunityChat from "./CommunityChat";
import CourseReviews from "./CourseReviews";

const CourseBuilder = ({ course, onBack }) => {
  const [activeTab, setActiveTab] = useState("Course Overview");
  const [learningObjectives, setLearningObjectives] = useState([
    "Integrate daily mindfulness practices rooted in Islamic tradition",
    "Develop emotional awareness and self-compassion through Quranic principles",
    "Learn practical coping strategies for anxiety and stress",
    "Connect spiritual practices with mental well-being",
  ]);
  const [requirements, setRequirements] = useState([
    "Basic understanding of Islamic principles",
    "Commitment to daily practice (15-20 minutes)",
    "Journal or notebook for reflections",
  ]);

  const [newObjective, setNewObjective] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const tabs = [
    "Course Overview",
    "Course Curriculum",
    "Review",
    "Community Chat",
  ];

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoName(file.name);
    }
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setLearningObjectives([...learningObjectives, newObjective]);
      setNewObjective("");
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement]);
      setNewRequirement("");
    }
  };

  const removeObjective = (index) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 pb-20">
      {/* Top Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 font-medium hover:text-teal-700 transition-colors w-fit group"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </div>
        <span>Back to Courses</span>
      </button>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-greenTeal tracking-tight">
            Course Builder
          </h1>
          <p className="text-stone-500 font-medium tracking-wide">
            Create comprehensive course content for students
          </p>
        </div>
        <button className="flex items-center gap-2 bg-greenTeal text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg active:scale-95">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
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

      {/* Main Content Area */}
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
                  defaultValue={course?.title || "Mindfulness in Islam"}
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
              </FormGroup>

              <FormGroup label="Course Subtitle">
                <input
                  type="text"
                  placeholder="Faith-centered emotional healing journey"
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800"
                />
              </FormGroup>

              <FormGroup label="Course Description">
                <textarea
                  rows={4}
                  placeholder="Detailed description of what students will learn..."
                  className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-300 transition-all font-medium text-stone-800 resize-none"
                />
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormGroup label="Price ($)">
                  <input
                    type="text"
                    defaultValue="99"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none"
                  />
                </FormGroup>
                <FormGroup label="Duration (weeks)">
                  <input
                    type="text"
                    defaultValue="12"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none"
                  />
                </FormGroup>
                <FormGroup label="Level">
                  <select className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 outline-none appearance-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </FormGroup>
                <FormGroup label="Category">
                  <input
                    type="text"
                    defaultValue="Recorded"
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
                preview={thumbnailPreview}
              />
              <UploadCard
                title="Course Preview Video"
                subtitle="MP4, MOV (Max 2 min)"
                icon={<Play className="w-8 h-8 text-stone-400" />}
                btnText="Upload Video"
                onChange={handleVideoUpload}
                accept="video/*"
                preview={videoName}
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
              {learningObjectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <p className="flex-1 text-sm font-medium text-stone-800 leading-relaxed inter-font">
                    {obj}
                  </p>
                  <button
                    onClick={() => removeObjective(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
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
                  className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none inter-font"
                />
                <button
                  onClick={addObjective}
                  className="w-12 h-12 flex items-center justify-center bg-greenTeal text-white rounded-xl hover:bg-stone-800 transition-all"
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
              {requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 group"
                >
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="flex-1 text-sm font-medium text-stone-800 leading-relaxed inter-font">
                    {req}
                  </p>
                  <button
                    onClick={() => removeRequirement(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
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
                  className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 outline-none inter-font"
                />
                <button
                  onClick={addRequirement}
                  className="w-12 h-12 flex items-center justify-center bg-greenTeal text-white rounded-xl hover:bg-stone-800 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      {activeTab === "Course Curriculum" && <CourseCurriculum />}
      {activeTab === "Review" && <CourseReviews />}
      {activeTab === "Community Chat" && <CommunityChat />}
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
  const fileInputRef = React.useRef(null);

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-stone-200 rounded-3xl hover:border-teal-400 hover:bg-teal-50/10 transition-all group cursor-pointer relative overflow-hidden"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        accept={accept}
        className="hidden"
      />

      {preview &&
      typeof preview === "string" &&
      preview.startsWith("data:image") ? (
        <div className="absolute inset-0 z-0">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-center">
          <h4 className="text-greenTeal font-bold inter-font">{title}</h4>
          <p className="text-stone-400 text-xs mt-1 inter-font">
            {preview && !preview.startsWith("data:image")
              ? `Selected: ${preview}`
              : subtitle}
          </p>
        </div>
        <button className="bg-white border border-stone-200 px-6 py-2 rounded-xl text-stone-600 font-bold text-sm shadow-sm hover:border-stone-400 transition-all">
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
