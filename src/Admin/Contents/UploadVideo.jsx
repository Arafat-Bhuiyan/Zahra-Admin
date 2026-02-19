import React, { useState, useRef } from "react";
import {
  X,
  Image as ImageIcon,
  Video,
  Plus,
  Send,
  Calendar,
  Clock,
  ArrowLeft,
  Trash2,
  ExternalLink,
} from "lucide-react";

const UploadVideo = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content:
      "Discover how we integrate Islamic wisdom with modern psychological practices for holistic healing.",
    readTime: "12:45",
    publishDate: "",
    tags: ["Islamic Spirituality", "Mental Health", "Mindfulness"],
    coverImage: null,
    externalLink: "",
  });

  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);

  const wordCount = formData.content.trim()
    ? formData.content.trim().split(/\s+/).length
    : 0;

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, coverImage: URL.createObjectURL(file) });
  };

  const handleUpload = () => {
    // Static save for demonstration
    const newItem = {
      id: Date.now(),
      type: "Video",
      thumbnail:
        formData.coverImage ||
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
      date: formData.publishDate || "Feb 01, 2026",
      duration: formData.readTime || "12:45",
      category: formData.tags[0] || "General",
      title: formData.title || "Untitled Video Content",
      description:
        formData.excerpt ||
        "A brief summary of the newly uploaded video for preview purposes.",
      author: "Admin",
      status: "Approved",
    };
    onSave(newItem);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 inter-font">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-base font-normal">Back to Content</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form Section */}
        <div className="flex-1 space-y-6">
          {/* Video Thumbnail Upload */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex flex-col gap-6">
            <h3 className="text-neutral-950 text-lg font-medium">
              Upload Video
            </h3>
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-80 rounded-[10px] border-2 border-dashed border-gray-300 flex flex-col justify-center items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
            >
              {formData.coverImage ? (
                <video
                  src={formData.coverImage}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                <>
                  <div className="p-4 bg-gray-100 rounded-full group-hover:scale-110 transition-transform">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Click to upload video
                  </p>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    Recommended: 1280x720px, MP4 or MOV
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>

            {/* External Link Option - Following AddLesson/UploadContent style */}
            <div className="space-y-4 pt-2 border-t border-gray-100/50">
              <div className="flex justify-between items-center ml-1">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#7AA4A5]" />
                  <label className="text-sm font-bold text-gray-700">
                    Video Source Link
                  </label>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-md">
                  YouTube, Vimeo, S3, etc.
                </span>
              </div>
              <input
                type="text"
                value={formData.externalLink}
                onChange={(e) =>
                  setFormData({ ...formData, externalLink: e.target.value })
                }
                placeholder="Paste your video link here (YouTube, Vimeo, etc.)"
                className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 font-bold placeholder:font-normal placeholder:text-gray-400 transition-all border border-transparent"
              />
              <p className="text-[10px] font-medium text-gray-400 ml-1">
                * All external streaming and storage providers are supported.
                The link will be used if no file is uploaded.
              </p>
            </div>
          </div>

          {/* Content Title */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h3 className="text-neutral-950 text-lg font-medium">
              Video Title
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter a compelling video title..."
                className="w-full px-4 py-3 bg-zinc-100 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 font-bold placeholder:text-gray-500"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <p className="text-gray-500 text-xs font-normal">
                0/100 characters
              </p>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h3 className="text-neutral-950 text-lg font-medium">
              Description
            </h3>
            <div className="space-y-2">
              <textarea
                placeholder="Write a brief summary (this will appear in Video previews)..."
                rows={3}
                className="w-full px-4 py-3 bg-zinc-100 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 resize-none placeholder:text-gray-500"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
              <p className="text-gray-500 text-xs font-normal">
                0/300 characters
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h3 className="text-neutral-950 text-lg font-medium">
              About this Video
            </h3>
            <div className="space-y-2">
              <div className="w-full min-h-[300px] p-4 bg-zinc-100 rounded-lg text-stone-700 text-base font-normal arimo-font leading-relaxed focus-within:ring-2 focus-within:ring-[#7AA4A5]/20">
                <textarea
                  className="w-full h-full bg-transparent border-none focus:outline-none resize-none"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                />
              </div>
              <p className="text-gray-500 text-sm font-normal">
                {wordCount} words
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-96 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Publishing Options */}
            <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
              <h3 className="text-neutral-950 text-lg font-medium">
                Video Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold">
                    Video Duration
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg flex items-center text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20"
                      placeholder="e.g. 12:45"
                    />
                    <Clock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-semibold">
                    Upload Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publishDate: e.target.value,
                        })
                      }
                      className="w-full h-10 bg-zinc-100 rounded-lg flex items-center px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
              <h3 className="text-neutral-950 text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-white border border-black/10 rounded-lg text-neutral-950 text-xs font-medium flex items-center gap-1.5 group"
                  >
                    <span>+ {tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 bg-zinc-100 rounded-lg text-sm text-neutral-900 placeholder:text-gray-500 font-normal focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20"
                />
                <button
                  onClick={handleAddTag}
                  className="p-2.5 bg-greenTeal rounded-lg text-white hover:bg-slate-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
              <h3 className="text-neutral-950 text-lg font-medium">
                Author Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  SA
                </div>
                <div>
                  <h4 className="text-neutral-950 text-base font-semibold">
                    Admin
                  </h4>
                  <p className="text-gray-600 text-xs font-normal">
                    Islamic Psychology Expert
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleUpload}
              className="bg-[#7AA4A5] hover:bg-[#6b9192] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md flex items-center gap-2 group"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
