import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  ChevronDown,
  Image as ImageIcon,
  FileText,
  Plus,
} from "lucide-react";

const UploadBookModal = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("Basic");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "Health",
    language: "English",
    price: "99",
    type: "Both (Physical & Digital)",
    isbn: "978-1-234567-89-0",
    publisher: "",
    publishDate: "",
    pages: "0",
    tags: "Psychology, Islamic Studies, Mental Health",
    coverImage: null,
    otherImages: [null, null, null],
    bookFile: null,
  });

  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const otherInputRefs = [useRef(null), useRef(null), useRef(null)];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "cover") {
      setFormData((prev) => ({ ...prev, coverImage: file }));
    } else if (type === "other") {
      const newOtherImages = [...formData.otherImages];
      newOtherImages[index] = file;
      setFormData((prev) => ({ ...prev, otherImages: newOtherImages }));
    } else if (type === "book") {
      setFormData((prev) => ({ ...prev, bookFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would handle file uploads here
    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      type: formData.type.includes("Both") ? "Both" : formData.type,
      downloads: "0",
      date: new Date().toLocaleDateString(),
      image: formData.coverImage
        ? URL.createObjectURL(formData.coverImage)
        : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop",
    };
    onSave(newBook);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-[550px] bg-white rounded-2xl shadow-2xl relative overflow-hidden arimo-font animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <h2 className="text-neutral-950 text-xl font-bold">
                Upload New Book
              </h2>
            </div>
            <p className="text-gray-500 text-sm font-normal">
              Add a new book to the library with all necessary details
            </p>
          </div>

          {/* Tabs */}
          <div className="w-full bg-gray-100 p-1 rounded-xl flex gap-1 mb-6">
            {["Basic", "Details", "Files"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white text-neutral-950 shadow-sm"
                    : "text-gray-500 hover:text-neutral-800"
                }`}
              >
                {tab === "Basic" ? "Basic Info" : tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === "Basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter book title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      placeholder="Enter author name"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter book description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-24 px-3 py-2 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400 resize-none font-['Arimo']"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-sm text-neutral-950"
                      >
                        <option value="Health">Health</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Lifestyle">Lifestyle</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Language
                    </label>
                    <div className="relative">
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-sm text-neutral-950"
                      >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Bengali">Bengali</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Price ($) *
                    </label>
                    <input
                      type="text"
                      name="price"
                      placeholder="99"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Book Type *
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-sm text-neutral-950"
                      >
                        <option value="Both (Physical & Digital)">
                          Both (Physical & Digital)
                        </option>
                        <option value="Physical">Physical Only</option>
                        <option value="Digital">Digital Only</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Details" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      placeholder="978-1-234567-89-0"
                      value={formData.isbn}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      placeholder="Publisher name"
                      value={formData.publisher}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Number of Pages
                    </label>
                    <input
                      type="number"
                      name="pages"
                      placeholder="0"
                      value={formData.pages}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Psychology, Islamic Studies, Mental Health"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {activeTab === "Files" && (
              <div className="space-y-5">
                <div className="flex gap-4">
                  {/* Cover Image */}
                  <div className="flex-1 space-y-2">
                    <label className="text-neutral-950 text-sm font-normal">
                      Cover Image *
                    </label>
                    <div
                      onClick={() => coverInputRef.current?.click()}
                      className="h-44 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                    >
                      <input
                        type="file"
                        className="hidden"
                        ref={coverInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "cover")}
                      />
                      {formData.coverImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(formData.coverImage)}
                            className="w-full h-full object-contain rounded-lg"
                            alt="Cover"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-600 text-center font-medium">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                          <button
                            type="button"
                            className="mt-4 px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-medium"
                          >
                            Select Image
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Other Images */}
                  <div className="w-[180px] space-y-2">
                    <label className="text-neutral-950 text-sm font-normal">
                      Other Image
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[0, 1, 2].map((idx) => (
                        <div
                          key={idx}
                          onClick={() => otherInputRefs[idx].current?.click()}
                          className="h-12 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                        >
                          <input
                            type="file"
                            className="hidden"
                            ref={otherInputRefs[idx]}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "other", idx)}
                          />
                          {formData.otherImages[idx] ? (
                            <img
                              src={URL.createObjectURL(
                                formData.otherImages[idx],
                              )}
                              className="w-full h-full object-cover rounded-md"
                              alt="Other"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-[10px] text-gray-400">
                                PNG, JPG up to 5MB
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Book File */}
                <div className="space-y-2">
                  <label className="text-neutral-950 text-sm font-normal">
                    Book File (PDF/ePub) *
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept=".pdf,.epub"
                      onChange={(e) => handleFileChange(e, "book")}
                    />
                    {formData.bookFile ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-teal-600" />
                        <span className="text-sm font-medium text-neutral-950">
                          {formData.bookFile.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                          <FileText className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, ePub up to 50MB
                        </p>
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium"
                        >
                          Select File
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-3 pt-6 border-t border-black/5">
              <button
                type="button"
                onClick={onClose}
                className="px-6 h-10 bg-white border border-black/10 hover:bg-gray-50 text-neutral-950 rounded-lg text-sm font-normal flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Upload className="w-4 h-4" />
                Upload Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBookModal;
