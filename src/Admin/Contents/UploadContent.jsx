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
  ChevronDown,
} from "lucide-react";
import QuillEditor from "../../components/QuillEditor";
import {
  useAddBlogMutation,
  useGetBlogCategoriesQuery,
} from "../../Api/adminApi";

const UploadContent = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: [],
    coverImage: null,
    coverImagePreview: null,
    category: "",
  });

  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const { data: categoriesResponse } = useGetBlogCategoriesQuery();
  const [addBlog] = useAddBlogMutation();
  // The API returns a direct array [{}, {}] instead of a paginated object with results
  const categories = categoriesResponse || [];
  console.log("Categories:", categories);

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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "cover") {
      setFormData({
        ...formData,
        coverImage: file,
        coverImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.category || !formData.content) {
      alert("Please fill in title, category, and content.");
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("excerpt", formData.excerpt);
      uploadData.append("content", formData.content);
      uploadData.append("category", formData.category);
      if (formData.coverImage) {
        uploadData.append("cover_image", formData.coverImage);
      }
      formData.tags.forEach((tag) => {
        uploadData.append("tags", tag);
      });

      await addBlog(uploadData).unwrap();
      onBack();
    } catch (err) {
      console.error("Failed to add blog:", err);
      alert("Error adding blog: " + (err.data?.detail || err.message || "Unknown error"));
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
          {/* Cover Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm flex flex-col gap-6">
            <h3 className="text-neutral-950 text-lg font-medium">
              Cover Image
            </h3>
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-80 rounded-[10px] border-2 border-dashed border-gray-300 flex flex-col justify-center items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
            >
              {formData.coverImagePreview ? (
                <img
                  src={formData.coverImagePreview}
                  className="w-full h-full object-cover"
                  alt="Cover"
                />
              ) : (
                <>
                  <div className="p-4 bg-gray-100 rounded-full group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm font-semibold">
                    Click to upload cover image
                  </p>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    Recommended: 1200x630px, JPG or PNG
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "cover")}
              />
            </div>
          </div>

          {/* Content Title */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h3 className="text-neutral-950 text-lg font-medium">
              Content Title
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter a compelling title..."
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
                placeholder="Write a brief summary (this will appear in Content previews)..."
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
              About this Content
            </h3>
            <div className="space-y-2">
              <QuillEditor
                value={formData.content}
                onChange={(html) =>
                  setFormData({ ...formData, content: html })
                }
                placeholder="Write your content here..."
              />
              <p className="text-gray-500 text-sm font-normal">
                {wordCount} words
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-6">
              <h3 className="text-neutral-950 text-lg font-medium">Category</h3>
              <div className="relative">
                <select
                  className="w-full h-11 px-4 bg-zinc-100 border-none rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
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

export default UploadContent;
