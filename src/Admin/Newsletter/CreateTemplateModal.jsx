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
        <div className="px-8 py-6 bg-gradient-to-r from-slate-400 to-slate-500 relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">
                Create Email Template
              </h2>
              <p className="text-white/90 text-sm mt-1">
                Design reusable email templates
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto flex flex-col"
        >
          <div className="p-8 space-y-6">
            {/* Template Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Template Name
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Welcome Email"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Template Type */}
            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-neutral-700">
                Template Type
              </label>
              <div
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 cursor-pointer flex justify-between items-center bg-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span
                  className={
                    formData.type ? "text-neutral-800" : "text-neutral-400"
                  }
                >
                  {formData.type
                    ? templateTypes.find((t) => t.value === formData.type)
                        ?.label
                    : "Select type"}
                </span>
                <ChevronDown size={18} className="text-neutral-500" />
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {templateTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => handleTypeSelect(type.value)}
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-neutral-700 text-sm transition-colors"
                    >
                      {type.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Email Subject */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Email Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Welcome to LearnHub!"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Email Body */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Email Body
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={`Hi {{name}},

Your email content here...

Best regards,
LearnHub Team`}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all resize-none min-h-[300px] placeholder:text-neutral-400 font-mono text-sm leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-100 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-md active:scale-95 ${
                formData.title &&
                formData.type &&
                formData.subject &&
                formData.content
                  ? "bg-[#7BA0A0] text-white hover:bg-[#6A8F8F]"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
              disabled={
                !formData.title ||
                !formData.type ||
                !formData.subject ||
                !formData.content
              }
            >
              <Save size={18} />
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
