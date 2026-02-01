import React, { useState, useEffect } from "react";
import { X, Edit3, Save, ChevronDown } from "lucide-react";

const EditBookModal = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    type: "",
    status: "Active",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        category: book.category || "",
        price: book.price || "",
        type: book.type || "",
        status: book.status || "Active",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...book, ...formData });
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-[512px] bg-white rounded-2xl shadow-2xl relative overflow-hidden arimo-font">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <Edit3 className="w-5 h-5" />
              <h2 className="text-neutral-950 text-lg font-bold">
                Edit Book Details
              </h2>
            </div>
            <p className="text-gray-500 text-sm font-normal">
              Update book information and settings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Book Title */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-neutral-950 text-sm font-normal">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                  >
                    <option value="Psychology">Psychology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="History">History</option>
                    <option value="Parenting">Parenting</option>
                    <option value="Health">Health</option>
                    <option value="Mental Health">Mental Health</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Price ($)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Book Type */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Book Type
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                  >
                    <option value="Both">Both (Physical & Digital)</option>
                    <option value="Digital">Digital</option>
                    <option value="Physical">Physical</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-neutral-950 text-sm font-normal">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-neutral-950 text-sm focus:ring-2 focus:ring-teal-600/20"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-3 pt-4 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 h-10 bg-white border border-black/10 hover:bg-gray-50 text-neutral-950 rounded-lg text-sm font-normal transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center gap-2 text-sm font-normal transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
