import React, { useState } from "react";
import { X, Send, Type } from "lucide-react";
import { useCreateCourseAnnouncementMutation } from "../../Api/adminApi";
import toast from "react-hot-toast";

const CreateAnnouncementModal = ({ isOpen, onClose, coursePk }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [createCourseAnnouncement, { isLoading }] = useCreateCourseAnnouncementMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.body) {
      toast.error("Please fill in the title and body.");
      return;
    }

    try {
      await createCourseAnnouncement({ course_pk: coursePk, body: formData }).unwrap();
      toast.success("Course announcement created successfully!");
      setFormData({ title: "", body: "" });
      onClose();
    } catch (err) {
      const errorMsg = err?.data?.error 
        || (err?.data && typeof err.data === 'object' && Object.values(err.data).flat().join(" | "))
        || "Failed to create announcement.";
      toast.error(errorMsg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-black/5">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[#7AA4A5] to-[#5e8283] relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">
                Create Course Announcement
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Notify enrolled students about important updates
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

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar"
        >
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
              <Type size={16} /> Notice Details
            </h3>

            <div className="space-y-1.5 font-['Arimo']">
              <label className="text-xs font-bold text-neutral-500 ml-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Schedule Change"
                className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-bold"
                required
              />
            </div>

            <div className="space-y-1.5 font-['Arimo']">
              <label className="text-xs font-bold text-neutral-500 ml-1">
                Body <span className="text-red-500">*</span>
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={5}
                placeholder="Type your announcement here..."
                className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-medium resize-none"
                required
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-5 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-100 transition-all active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-xl bg-[#7BA0A0] text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#6A8F8F] transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Send size={16} />
            {isLoading ? "Sending..." : "Create Announcement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
