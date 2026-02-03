import React, { useState } from "react";
import { X, FileText, Info, Save } from "lucide-react";

const CreateNewsletterModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subject || !formData.content) {
      alert("Please fill in all fields.");
      return;
    }

    const newNewsletter = {
      id: Date.now(),
      title: formData.title,
      subject: formData.subject,
      preview: formData.content.substring(0, 100) + "...",
      status: "draft",
    };

    onSave(newNewsletter);
    setFormData({ title: "", subject: "", content: "" });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[880px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">
                Create Newsletter
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Send updates to 4 subscribers
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
            {/* Newsletter Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Newsletter Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., January 2026 Course Updates"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Email Subject Line */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Email Subject Line
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., New Courses & Features This Month"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Newsletter Content */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">
                Newsletter Content
              </label>
              <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                <Info size={14} />
                <span>
                  Rich text editor (In production, this would be a WYSIWYG
                  editor)
                </span>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your newsletter content here...

You can include:
- Course announcements
- Student success stories
- Platform updates
- Tips and resources"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all resize-none min-h-[300px] placeholder:text-neutral-400 leading-relaxed"
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
                formData.title && formData.subject && formData.content
                  ? "bg-[#7BA0A0] text-white hover:bg-[#6A8F8F]"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
              disabled={
                !formData.title || !formData.subject || !formData.content
              }
            >
              <Save size={18} />
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsletterModal;
