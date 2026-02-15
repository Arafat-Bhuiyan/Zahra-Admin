import React, { useState } from "react";
import { X, Save, ChevronDown } from "lucide-react";

const CreateTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    subject: "",
    content: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Template types based on the design
  const templateTypes = [
    {
      label: "Registration",
      value: "registration",
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Welcome",
      value: "welcome",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Password Reset",
      value: "password-reset",
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Course Enrollment",
      value: "course-enrollment",
      color: "bg-purple-100 text-purple-700",
    },
    { label: "Custom", value: "custom", color: "bg-gray-100 text-gray-700" },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.type ||
      !formData.subject ||
      !formData.content
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const selectedType = templateTypes.find((t) => t.value === formData.type);

    const newTemplate = {
      id: Date.now(),
      title: formData.title,
      tag: selectedType ? selectedType.value : "custom",
      tagColor: selectedType ? selectedType.color : "bg-gray-100 text-gray-700",
      subject: formData.subject,
      preview: formData.content, // Using content as preview for now
      used: 0,
      modified: new Date().toISOString().split("T")[0],
    };

    onSave(newTemplate);
    setFormData({ title: "", type: "", subject: "", content: "" });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (typeValue) => {
    setFormData((prev) => ({ ...prev, type: typeValue }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[760px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-3xl font-extrabold text-neutral-800 tracking-tight inter-font">
                Create New Template
              </h2>
              <p className="text-neutral-500 text-sm mt-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#7AA4A5] rounded-full animate-pulse" />
                Customize and save high-performance email designs
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-all active:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto flex flex-col bg-slate-50/30"
        >
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Template Name */}
              <div className="space-y-2.5 flex flex-col">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                  Template Identity
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Onboarding Welcome"
                  className="w-full px-5 py-3.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-[#7BA0A0]/10 focus:border-[#7BA0A0] transition-all bg-white shadow-sm placeholder:text-neutral-300"
                  required
                />
              </div>

              {/* Template Type */}
              <div className="space-y-2.5 relative flex flex-col">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                  Category Tag
                </label>
                <div
                  className="w-full px-5 py-3.5 rounded-2xl border border-neutral-200 cursor-pointer flex justify-between items-center bg-white shadow-sm hover:border-[#7BA0A0] transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span
                    className={
                      formData.type
                        ? "text-neutral-800 font-medium"
                        : "text-neutral-300"
                    }
                  >
                    {formData.type
                      ? templateTypes.find((t) => t.value === formData.type)
                          ?.label
                      : "Select category..."}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-neutral-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {templateTypes.map((type) => (
                      <div
                        key={type.value}
                        onClick={() => handleTypeSelect(type.value)}
                        className="px-5 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <span className="text-neutral-700 text-sm font-medium group-hover:text-[#7BA0A0]">
                          {type.label}
                        </span>
                        {formData.type === type.value && (
                          <div className="w-1.5 h-1.5 bg-[#7BA0A0] rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email Subject */}
            <div className="space-y-2.5 flex flex-col">
              <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Default Subject Line
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Welcome to Sakeena Institute! 👋"
                className="w-full px-5 py-3.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-[#7BA0A0]/10 focus:border-[#7BA0A0] transition-all bg-white shadow-sm placeholder:text-neutral-300 font-medium"
                required
              />
            </div>

            {/* Email Body */}
            <div className="space-y-2.5 flex flex-col">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-widest">
                  Email Blueprint
                </label>
                <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-2 py-0.5 rounded italic">
                  Markdown & Placeholders supported
                </span>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={`Hi {{name}},

Welcome to Sakeena Institute! Your learning journey begins now.

Warm regards,
The Team`}
                className="w-full px-6 py-5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-[#7BA0A0]/10 focus:border-[#7BA0A0] transition-all resize-none min-h-[350px] bg-white shadow-sm placeholder:text-neutral-300 font-mono text-sm leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-6 bg-white border-t border-neutral-100 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-neutral-500 font-bold hover:text-neutral-800 hover:bg-slate-50 transition-all active:scale-95 text-sm"
            >
              Discard
            </button>
            <button
              type="submit"
              className={`px-10 py-3.5 rounded-2xl flex items-center gap-2.5 font-bold transition-all shadow-lg active:scale-95 text-sm ${
                formData.title &&
                formData.type &&
                formData.subject &&
                formData.content
                  ? "bg-[#7BA0A0] text-white hover:bg-[#6A8F8F] shadow-[#7BA0A0]/20"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none"
              }`}
              disabled={
                !formData.title ||
                !formData.type ||
                !formData.subject ||
                !formData.content
              }
            >
              <Save size={20} />
              Publish Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
