import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const AddEditCourse = ({ course, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    category: "Mental Health",
    status: "Upcoming",
    price: "",
    duration: "",
    lessons: "",
    totalHours: "",
    sessionDuration: "",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        imagePreview: course.image,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-stone-100 rounded-xl text-stone-500 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-['Arimo']">
              {course ? "Edit Course" : "Add New Course"}
            </h2>
            <p className="text-sm text-stone-500 font-['Arimo']">
              Fill in the details to {course ? "update" : "create"} the course
              information
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-greenTeal text-white rounded-xl text-sm font-semibold shadow-lg shadow-teal-900/20 hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {course ? "Update Course" : "Publish Course"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-20">
        {/* Top: Course Thumbnail (Full Width) */}
        <div className="bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
            Course Thumbnail
          </h3>
          <div className="relative h-[300px] w-full rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 overflow-hidden group hover:border-teal-400 transition-colors cursor-pointer">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 space-y-2">
                <Upload className="w-8 h-8" />
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-stone-600">
                    Click to upload thumbnail
                  </span>
                  <span className="text-xs">Supported: JPG, PNG, WEBP</span>
                </div>
              </div>
            )}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Bottom: Unified Information Form */}
        <div className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title (Full Width) */}
            <div className="md:col-span-2">
              <InputGroup
                label="Course Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Advanced Islamic Psychology"
                icon={<BookOpen className="w-4 h-4" />}
                full
              />
            </div>

            {/* Other fields (Half Width) */}
            <InputGroup
              label="Number of Lessons"
              name="lessons"
              value={formData.lessons}
              onChange={handleChange}
              placeholder="e.g. 24"
              type="number"
              icon={<BookOpen className="w-4 h-4" />}
            />

            <InputGroup
              label="Duration (weeks)"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 12"
              icon={<Calendar className="w-4 h-4" />}
            />

            <InputGroup
              label="Price ($) *"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 99"
              icon={<DollarSign className="w-4 h-4" />}
            />

            <SelectGroup
              label="Category *"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Mental Health",
                "Spiritual Growth",
                "Relationships",
                "Professional",
              ]}
              icon={<Tag className="w-4 h-4" />}
            />

            <SelectGroup
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Upcoming", "Live", "Recorded"]}
              icon={<Clock className="w-4 h-4" />}
            />

            <SelectGroup
              label="Assign Teacher"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              options={[
                "Select Teacher",
                "Dr. Ahmed Hassan",
                "Dr. Yasir Qadhi",
                "Fatima Rahman",
              ]}
              icon={<User className="w-4 h-4" />}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  full = false,
}) => (
  <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-['Arimo'] ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-teal-600 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all font-['Arimo'] text-stone-800 text-sm"
      />
    </div>
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options, icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest font-['Arimo'] ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-teal-600 transition-colors">
        {icon}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 pl-11 pr-4 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all font-['Arimo'] text-stone-800 text-sm appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default AddEditCourse;
