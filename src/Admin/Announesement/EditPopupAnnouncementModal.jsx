import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  Tag,
  Type,
} from "lucide-react";
import { useUpdateSiteAnnouncementMutation } from "../../Api/adminApi";
import toast from "react-hot-toast";

const EditPopupAnnouncementModal = ({ isOpen, onClose, announcement }) => {
  const [formData, setFormData] = useState({
    title_prefix: "",
    main_title: "",
    message: "",
    cta_text: "",
    cta_link: "",
    badges: [],
    highlights: [],
    is_active: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newBadge, setNewBadge] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const [updateAnnouncement, { isLoading }] = useUpdateSiteAnnouncementMutation();

  useEffect(() => {
    if (isOpen && announcement) {
      setFormData({
        title_prefix: announcement.title_prefix || "",
        main_title: announcement.main_title || "",
        message: announcement.message || "",
        cta_text: announcement.cta_text || "Learn more",
        cta_link: announcement.cta_link || "",
        badges: Array.isArray(announcement.badges) ? announcement.badges : [],
        highlights: Array.isArray(announcement.highlights) ? announcement.highlights : [],
        is_active: announcement.is_active !== undefined ? announcement.is_active : true,
      });
      setImagePreview(announcement.image || null);
      setImageFile(null);
    }
  }, [isOpen, announcement]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.main_title || !formData.message) {
      toast.error("Please fill in the main title and message.");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title_prefix", formData.title_prefix);
      submitData.append("main_title", formData.main_title);
      submitData.append("message", formData.message);
      submitData.append("cta_text", formData.cta_text);
      submitData.append("cta_link", formData.cta_link);
      submitData.append("is_active", formData.is_active);

      submitData.append("badges", JSON.stringify(formData.badges));
      submitData.append("highlights", JSON.stringify(formData.highlights));

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      await updateAnnouncement({ id: announcement.id, body: submitData }).unwrap();
      toast.success("Site announcement updated successfully!");
      onClose();
    } catch (err) {
      const errorMsg = err?.data?.error 
        || (err?.data && typeof err.data === 'object' && Object.values(err.data).flat().join(" | "))
        || "Failed to update announcement.";
      toast.error(errorMsg);
    }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 arimo-font">
      <div className="w-full max-w-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-black/5">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[#7AA4A5] to-[#5e8283] relative">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-2xl font-bold inter-font">Edit Site Popup</h2>
              <p className="text-white/80 text-sm mt-1">Configure your site-wide announcement</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <Type size={16} /> Content Details
                </h3>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">Title Prefix</label>
                  <input
                    type="text"
                    name="title_prefix"
                    value={formData.title_prefix}
                    onChange={handleChange}
                    placeholder="e.g. Discover our"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">Main Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="main_title"
                    value={formData.main_title}
                    onChange={handleChange}
                    placeholder="e.g. Elephants"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5 font-['Arimo']">
                  <label className="text-xs font-bold text-neutral-500 ml-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Promotion message..."
                    className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-sm font-medium resize-none"
                    required
                  />
                </div>
              </div>

              {/* Badges Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <Tag size={16} /> Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.badges.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full flex items-center gap-1 border border-teal-100 uppercase tracking-widest">
                      {badge}
                      <button type="button" onClick={() => removeItem("badges", idx)}>
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
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem("badges", newBadge, setNewBadge))}
                    placeholder="Add Badge (e.g. New)"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-xs outline-none focus:border-[#7AA4A5]"
                  />
                  <button type="button" onClick={() => addItem("badges", newBadge, setNewBadge)} className="p-2 bg-[#7AA4A5] text-white rounded-xl hover:bg-[#6A8F8F]">
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

                <div className="space-y-1.5 flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-500 ml-1">Hero Image</label>
                  {imagePreview && (
                    <div className="w-full h-32 rounded-xl overflow-hidden border border-neutral-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-xs font-medium cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 ml-1">CTA Text</label>
                    <input
                      type="text"
                      name="cta_text"
                      value={formData.cta_text}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 ml-1">CTA Link</label>
                    <input
                      type="text"
                      name="cta_link"
                      value={formData.cta_link}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] outline-none transition-all text-xs font-bold text-neutral-500"
                    />
                  </div>
                </div>
              </div>

              {/* Highlights Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#7AA4A5] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} /> Highlights
                </h3>
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.highlights.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-neutral-50 rounded-lg border border-black/5 group">
                      <span className="text-xs font-medium text-neutral-600">{item}</span>
                      <button type="button" onClick={() => removeItem("highlights", idx)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addItem("highlights", newHighlight, setNewHighlight))}
                    placeholder="Add highlight..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-xs outline-none focus:border-[#7AA4A5]"
                  />
                  <button type="button" onClick={() => addItem("highlights", newHighlight, setNewHighlight)} className="p-2 bg-[#7AA4A5] text-white rounded-xl hover:bg-[#6A8F8F]">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">Status</h4>
                  <p className="text-[10px] text-emerald-600 font-medium tracking-wide leading-tight">Active popups are visible immediately</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-5 bg-neutral-50 border-t border-neutral-200 flex justify-end items-center gap-3">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-100 transition-all active:scale-95 text-sm">
            Cancel
          </button>
          <button disabled={isLoading} onClick={handleSubmit} className="px-8 py-2.5 rounded-xl bg-[#7BA0A0] text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#6A8F8F] transition-all shadow-lg active:scale-95 disabled:opacity-50">
            <Send size={16} />
            {isLoading ? "Updating..." : "Update Popup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopupAnnouncementModal;
