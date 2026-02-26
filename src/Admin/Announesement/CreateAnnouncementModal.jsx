import React, { useState, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  Tag,
  Link as LinkIcon,
  Type,
  AlignLeft,
} from "lucide-react";

const CreateAnnouncementModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    titlePrefix: "Discover our new",
    titleScript: "",
    message: "",
    checklist: [],
    badges: [],
    ctaText: "Explore Course",
    ctaLink: "/courses",
    imagePath: "",
    isActive: true,
  });

  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newBadge, setNewBadge] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titleScript || !formData.message) {
      alert("Please fill in the title and message.");
      return;
    }

    const newAnnouncement = {
      ...formData,
      id: Date.now(),
      publishedDate: new Date().toISOString().split("T")[0],
      author: "Admin User",
    };

    onAdd(newAnnouncement);
    onClose();

    // Reset form
    setFormData({
      titlePrefix: "Discover our new",
      titleScript: "",
      message: "",
      checklist: [],
      badges: [],
      ctaText: "Explore Course",
      ctaLink: "/courses",
      imagePath: "",
      isActive: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addItem = (field, value, setValue) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setValue("");
    }
  };

  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-black/5">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[#7AA4A5] to-[#5e8283] relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">
                Create Campaign Announcement
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Configure your course promotion announcement
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
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <Type size={16} /> Content Details
                </h3>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">
                    Title Prefix
                  </label>
                  <input
                    type="text"
                    name="titlePrefix"
                    value={formData.titlePrefix}
                    onChange={handleChange}
                    placeholder="e.g. Discover our new"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">
                    Main Title (Script) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titleScript"
                    value={formData.titleScript}
                    onChange={handleChange}
                    placeholder="e.g. Islamic Psychology"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Marketing message..."
                    className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-medium resize-none"
                    required
                  />
                </div>
              </div>

              {/* Badges Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} /> Campaign Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full flex items-center gap-1 border border-teal-100 uppercase tracking-widest"
                    >
                      {badge}
                      <button
                        type="button"
                        onClick={() => removeItem("badges", idx)}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 font-['Arimo']">
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      addItem("badges", newBadge, setNewBadge))
                    }
                    placeholder="Add Badge (e.g. New)"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-xs outline-none focus:border-[#7AA4A5]"
                  />
                  <button
                    type="button"
                    onClick={() => addItem("badges", newBadge, setNewBadge)}
                    className="p-2 bg-[#7AA4A5] text-white rounded-xl hover:bg-[#6A8F8F]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visuals & Links */}
            <div className="space-y-6">
              <div className="space-y-4 font-['Arimo']">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={16} /> Visual & CTA
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 ml-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imagePath"
                    value={formData.imagePath}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 ml-1">
                      CTA Text
                    </label>
                    <input
                      type="text"
                      name="ctaText"
                      value={formData.ctaText}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 ml-1">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      name="ctaLink"
                      value={formData.ctaLink}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-xs font-bold text-neutral-500"
                    />
                  </div>
                </div>
              </div>

              {/* Checklist Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} /> Course Highlights
                </h3>
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.checklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 bg-neutral-50 rounded-lg border border-black/5 group"
                    >
                      <span className="text-xs font-medium text-neutral-600">
                        {item}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem("checklist", idx)}
                        className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(),
                      addItem(
                        "checklist",
                        newChecklistItem,
                        setNewChecklistItem,
                      ))
                    }
                    placeholder="Add highlight..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-xs outline-none focus:border-[#7AA4A5]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addItem(
                        "checklist",
                        newChecklistItem,
                        setNewChecklistItem,
                      )
                    }
                    className="p-2 bg-[#7AA4A5] text-white rounded-xl hover:bg-[#6A8F8F]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">
                    Campaign Status
                  </h4>
                  <p className="text-[10px] text-emerald-600 font-medium tracking-wide leading-tight">
                    Active campaigns are visible on student dashboards
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
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
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-xl bg-[#7BA0A0] text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#6A8F8F] transition-all shadow-lg active:scale-95"
          >
            <Send size={16} />
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
