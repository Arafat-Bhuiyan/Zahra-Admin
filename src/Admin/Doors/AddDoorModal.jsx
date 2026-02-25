import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Image as ImageIcon,
  Link,
  Type,
  AlignLeft,
  Pencil,
  Upload,
} from "lucide-react";

const AddDoorModal = ({ isOpen, onClose, onSave, door }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    courseLink: "",
  });

  useEffect(() => {
    if (door) {
      setFormData({
        title: door.title || "",
        description: door.description || "",
        icon: door.icon || "",
        courseLink: door.courseLink || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        icon: "",
        courseLink: "",
      });
    }
  }, [door, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: door?.id || Date.now(),
    });
    setFormData({
      title: "",
      description: "",
      icon: "",
      courseLink: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, icon: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[550px] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#89A6A7]/10 rounded-lg">
              {door ? (
                <Pencil className="w-5 h-5 text-[#89A6A7]" />
              ) : (
                <BookOpen className="w-5 h-5 text-[#89A6A7]" />
              )}
            </div>
            <h2 className="text-neutral-900 text-xl font-bold arimo-font">
              {door ? "Edit Door" : "Add New Door"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Door Title
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="e.g. Advanced Mastery"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Description
            </label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                name="description"
                placeholder="Enter course description..."
                className="w-full min-h-[100px] pl-10 pr-4 py-3 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Icon/Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Door Icon Image
            </label>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border border-black/10 rounded-2xl">
              <div className="w-16 h-16 bg-white border border-black/5 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {formData.icon ? (
                  <img
                    src={formData.icon}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium text-neutral-700 shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Local File</span>
                </button>
                <p className="text-[10px] text-gray-400 ml-1">
                  * JPG, PNG or SVG. Max 2MB.
                </p>
              </div>
              {formData.icon && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon: "" }))}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Course Page Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Course Page Link
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                name="courseLink"
                placeholder="https://example.com/course"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                value={formData.courseLink}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 border border-black/10 rounded-xl text-sm font-medium text-neutral-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] h-11 bg-[#89A6A7] hover:bg-[#729394] text-white rounded-xl text-sm font-medium shadow-md transition-all active:scale-[0.98]"
            >
              {door ? "Update Door" : "Create Door"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoorModal;
