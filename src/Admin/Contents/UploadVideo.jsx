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
import QuillEditor from "../../components/QuillEditor";
import { useAddVideoMutation, useGetBlogCategoriesQuery } from "../../Api/adminApi";
import toast from "react-hot-toast";

const UploadVideo = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: ["Islamic Spirituality", "Mental Health", "Mindfulness"],
    coverImage: null, // This will store the preview URL
    coverImageFile: null, // This will store the actual File object
    videoUrl: "", // For external links
  });

  const { data: categoriesResponse } = useGetBlogCategoriesQuery();
  const [addVideo, { isLoading: isUploading }] = useAddVideoMutation();
  const categories = categoriesResponse || [];

  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const wordCount = stripHtml(formData.content).trim()
    ? stripHtml(formData.content).trim().split(/\s+/).length
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
    setFormData({
      ...formData,
      coverImage: URL.createObjectURL(file), // Preview image
      coverImageFile: file, // Image file to upload
    });
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.category) {
      toast.error("Title and Category are required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("video_url", formData.videoUrl);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      
      // Handle tags as an array
      formData.tags.forEach(tag => {
        data.append("tags", tag);
      });

      if (formData.coverImageFile) {
        data.append("cover_image", formData.coverImageFile);
      }

      await addVideo(data).unwrap();
      toast.success("Video uploaded successfully!");
      onSave(); // Close form or refresh
    } catch (err) {
      console.error("Failed to upload video:", err);
      toast.error(err?.data?.detail || "Failed to upload video. Please try again.");
    }
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
          {/* Video Thumbnail (Cover Image) */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex flex-col gap-6">
            <h3 className="text-neutral-950 text-lg font-medium">
              Upload Video Link
            </h3>

            {/* Video Source Link */}
            <div className="space-y-4 pt-2 border-t border-gray-100/50">
              <div className="flex justify-between items-center ml-1">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#7AA4A5]" />
                  <label className="text-sm font-bold text-gray-700">
                    Video URL
                  </label>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-md">
                  YouTube, Vimeo, etc.
                </span>
              </div>
              <input
                type="text"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="Paste your video link here..."
                className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 font-bold placeholder:font-normal placeholder:text-gray-400 transition-all border border-transparent"
              />
            </div>
          </div>

          {/* Category & Content Title */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="text-neutral-950 text-lg font-medium">Category</h3>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-zinc-100 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 font-medium"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
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
                  {formData.title.length}/100 characters
                </p>
              </div>
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
              <QuillEditor
                value={formData.content}
                onChange={(html) =>
                  setFormData({ ...formData, content: html })
                }
                placeholder="Write about this video..."
              />
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
            {/* <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
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
            </div> */}

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
              disabled={isUploading}
              className="bg-[#7AA4A5] hover:bg-[#6b9192] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
