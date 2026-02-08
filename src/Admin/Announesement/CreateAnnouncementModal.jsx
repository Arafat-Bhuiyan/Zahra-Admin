import React, { useState } from "react";
import { X, Search, Bell, Mail, AlertCircle, Send } from "lucide-react";

const CreateAnnouncementModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    course: "", // empty means platform-wide
    message: "",
    onSite: true,
    email: false,
    isUrgent: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: formData.title,
      description: formData.message,
      publishedDate: new Date().toISOString().split("T")[0],
      author: "Admin User",
      isUrgent: formData.isUrgent,
      tags: [
        {
          label: formData.course || "Platform-Wide",
          color: formData.course
            ? "bg-blue-100 text-blue-700"
            : "bg-purple-100 text-purple-700",
        },
      ],
      deliveryMethods: [
        ...(formData.onSite ? ["On-Site"] : []),
        ...(formData.email ? ["Email"] : []),
      ],
    };

    onAdd(newAnnouncement);

    // Reset form and close
    setFormData({
      title: "",
      course: "",
      message: "",
      onSite: true,
      email: false,
      isUrgent: false,
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[750px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-b from-[#7AA4A5] to-[#6A9495] relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">
                Create New Announcement
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Send notifications to students
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
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700 flex items-center gap-1">
                Announcement Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., New Course Module Released"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Course Selection */}
            <div className="space-y-2">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-neutral-700">
                  Course (Optional)
                </label>
                <p className="text-xs text-neutral-500">
                  Leave empty for platform-wide announcement
                </p>
              </div>
              <div className="relative group">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all bg-white text-neutral-600"
                >
                  <option value="">Platform-Wide Announcement</option>
                  <option value="Advanced React Patterns">
                    Advanced React Patterns
                  </option>
                  <option value="Data Science Fundamentals">
                    Data Science Fundamentals
                  </option>
                  <option value="UI/UX Design Masterclass">
                    UI/UX Design Masterclass
                  </option>
                  <option value="JavaScript ES6+">JavaScript ES6+</option>
                  <option value="Python for Beginners">
                    Python for Beginners
                  </option>
                </select>
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:text-slate-500"
                  size={18}
                />
              </div>
            </div>

            {/* Full Message */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700 flex items-center gap-1">
                Full Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your announcement message here..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all resize-none placeholder:text-neutral-400"
                required
              />
            </div>

            {/* Notification Options */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Bell size={18} className="text-slate-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Notification Options
                </h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      name="onSite"
                      checked={formData.onSite}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-neutral-300 text-slate-500 focus:ring-slate-400 transition-all"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800">
                      On-Site Notification
                    </p>
                    <p className="text-xs text-neutral-600">
                      Show in student dashboard notification bell
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      name="email"
                      checked={formData.email}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-neutral-300 text-slate-500 focus:ring-slate-400 transition-all"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800">
                      Email Notification
                    </p>
                    <p className="text-xs text-neutral-600">
                      Send email to all platform users
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Urgent Option */}
            <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    name="isUrgent"
                    checked={formData.isUrgent}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-red-200 text-red-600 focus:ring-red-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-red-800">
                    <AlertCircle size={16} className="font-bold" />
                    <span className="text-sm font-bold">Mark as Urgent</span>
                  </div>
                  <p className="text-xs text-red-700/80 leading-relaxed">
                    Urgent announcements are highlighted and appear at the top
                    of the feed
                  </p>
                </div>
              </label>
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
              className="px-6 py-2.5 rounded-xl bg-[#7BA0A0] text-white font-bold flex items-center gap-2 hover:bg-[#6A8F8F] transition-all shadow-md active:scale-95"
            >
              <Send size={18} />
              Create & Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
