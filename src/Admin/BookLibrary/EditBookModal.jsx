import React, { useState, useEffect } from "react";
import { X, Edit3, Save, ChevronDown, Eye, EyeOff, FileText, Upload } from "lucide-react";
import QuillEditor from "../../components/Editor";
import {
  useUpdateBookMutation,
  useGetBookCategoriesQuery,
  useGetLuluPackagesQuery,
} from "../../Api/adminApi";
import toast from "react-hot-toast";
import { useRef } from "react";

const EditBookModal = ({ book, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("Basic");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorDesignation: "",
    description: "",
    category: "1",
    language: "English",
    price: "0",
    type: "Both",
    isbn: "",
    publisher: "",
    published_date: "",
    number_of_pages: "0",
    tags: "",
    stock_count: "0",
    video_url: "",
    is_visible: true,
    lulu_pod_package_id: "",
    digital_file: null,
    sampleFile: null,
    luluCoverPdf: null,
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { data: categories } = useGetBookCategoriesQuery();
  const { data: luluPackages } = useGetLuluPackagesQuery();

  const fileInputRef = useRef(null);
  const sampleInputRef = useRef(null);
  const luluCoverInputRef = useRef(null);

  useEffect(() => {
    if (book) {
      const getBookType = (b) => {
        if (b.has_physical && b.has_digital) return "Both";
        if (b.has_physical) return "Physical";
        if (b.has_digital) return "Digital";
        return "Both";
      };

      setFormData({
        title: book.title || "",
        author: book.author || "",
        authorDesignation: book.author_designation || "",
        description: book.description || "",
        category: book.category?.toString() || "1",
        language: book.language || "English",
        price:
          parseFloat(book.digital_price) > 0
            ? book.digital_price
            : book.physical_price || "0",
        type: getBookType(book),
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        published_date: book.published_date || "",
        number_of_pages: book.number_of_pages?.toString() || "0",
        tags: Array.isArray(book.tags) ? book.tags.join(", ") : book.tags || "",
        stock_count: book.stock_count?.toString() || "0",
        video_url: book.video_url || "",
        is_visible: book.is_visible ?? true,
        lulu_pod_package_id: book.lulu_pod_package_id || "",
        digital_file: null,
        sampleFile: null,
        luluCoverPdf: null,
      });
    }
  }, [book]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "book") {
      setFormData((prev) => ({ ...prev, digital_file: file }));
    } else if (type === "sample") {
      setFormData((prev) => ({ ...prev, sampleFile: file }));
    } else if (type === "lulu_cover") {
      setFormData((prev) => ({ ...prev, luluCoverPdf: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("author_designation", formData.authorDesignation);
    data.append("description", formData.description);
    data.append("isbn", formData.isbn);
    data.append("language", formData.language);
    data.append("publisher", formData.publisher);
    data.append("published_date", formData.published_date);
    data.append("number_of_pages", formData.number_of_pages);
    data.append("video_url", formData.video_url || "");
    data.append("has_physical", has_physical);
    data.append("physical_price", has_physical ? formData.price : "0");
    data.append("stock_count", formData.stock_count);
    data.append("has_digital", has_digital);
    data.append("digital_price", has_digital ? formData.price : "0");

    if (formData.digital_file) data.append("digital_file", formData.digital_file);
    if (formData.sampleFile) data.append("sample_file", formData.sampleFile);
    if (formData.luluCoverPdf) data.append("lulu_cover_pdf", formData.luluCoverPdf);
    if (formData.lulu_pod_package_id) data.append("lulu_pod_package_id", formData.lulu_pod_package_id);

    const tagsArray = formData.tags
      ? formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "")
      : [];
    data.append("tags", JSON.stringify(tagsArray));
    data.append("is_visible", formData.is_visible);

    try {
      await updateBook({ slug: book.slug, body: data }).unwrap();
      toast.success("Book updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update book.");
    }
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

        <div className="p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <style>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: #e4e4e7;
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: #d4d4d8;
            }
          `}</style>
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

          <div className="w-full bg-gray-100 p-1 rounded-xl flex gap-1 mb-6">
            {["Basic", "Details", "Files"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab
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
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Book Title
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

                  {/* Visible Toggle */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between p-3 bg-zinc-100 border border-black/5 rounded-xl transition-all hover:bg-zinc-200/50">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors ${formData.is_visible
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600"
                            }`}
                        >
                          {formData.is_visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-neutral-900 arimo-font">
                            Visibility Status
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {formData.is_visible
                              ? "Visible on library"
                              : "Hidden from library"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            is_visible: !prev.is_visible,
                          }))
                        }
                        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ring-2 ring-transparent ring-offset-2 ${formData.is_visible ? "bg-teal-600" : "bg-gray-300"
                          }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${formData.is_visible
                            ? "translate-x-6"
                            : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Author
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
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Author Designation
                    </label>
                    <input
                      type="text"
                      name="authorDesignation"
                      placeholder="Enter author designation"
                      value={formData.authorDesignation}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Description
                  </label>
                  <QuillEditor
                    value={formData.description}
                    onChange={(html) =>
                      setFormData((prev) => ({ ...prev, description: html }))
                    }
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
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
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
                      value={formData.isbn}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Lulu POD Package
                  </label>
                  <div className="relative">
                    <select
                      name="lulu_pod_package_id"
                      value={formData.lulu_pod_package_id}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none appearance-none text-sm text-neutral-950"
                    >
                      <option value="">Select Package</option>
                      {luluPackages?.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.description}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Language
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Pages
                    </label>
                    <input
                      type="number"
                      name="number_of_pages"
                      value={formData.number_of_pages}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      name="stock_count"
                      value={formData.stock_count}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-950 text-sm font-normal">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      name="published_date"
                      value={formData.published_date}
                      onChange={handleChange}
                      className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="video_url"
                    value={formData.video_url}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-950 text-sm font-normal">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-zinc-100 rounded-lg outline-none text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "Files" && (
              <div className="space-y-5">
                {/* Book File */}
                <div className="space-y-2">
                  <label className="text-neutral-950 text-sm font-normal">
                    Book File (PDF)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "book")}
                    />
                    {formData.digital_file ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-teal-600" />
                        <span className="text-sm font-medium text-neutral-950">
                          {formData.digital_file.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-600 font-medium text-center">
                          {book.book_file ? "Click to replace book file" : "Click to upload book file"}
                        </p>
                        {book.book_file && <p className="text-[10px] text-teal-600 mt-1">Current file exists</p>}
                      </>
                    )}
                  </div>
                </div>

                {/* Sample File */}
                <div className="space-y-2">
                  <label className="text-neutral-950 text-sm font-normal">
                    Sample File (PDF)
                  </label>
                  <div
                    onClick={() => sampleInputRef.current?.click()}
                    className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={sampleInputRef}
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "sample")}
                    />
                    {formData.sampleFile ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-teal-600" />
                        <span className="text-sm font-medium text-neutral-950">
                          {formData.sampleFile.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-600 font-medium text-center">
                          {book.sample_file ? "Click to replace sample file" : "Click to upload sample file"}
                        </p>
                        {book.sample_file && <p className="text-[10px] text-teal-600 mt-1">Current sample exists</p>}
                      </>
                    )}
                  </div>
                </div>

                {/* Lulu Cover PDF */}
                <div className="space-y-2">
                  <label className="text-neutral-950 text-sm font-normal">
                    Lulu Cover PDF
                  </label>
                  <div
                    onClick={() => luluCoverInputRef.current?.click()}
                    className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-teal-400 transition-colors bg-gray-50/50"
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={luluCoverInputRef}
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "lulu_cover")}
                    />
                    {formData.luluCoverPdf ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-teal-600" />
                        <span className="text-sm font-medium text-neutral-950">
                          {formData.luluCoverPdf.name}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-600 font-medium text-center">
                          {book.lulu_cover_pdf ? "Click to replace Lulu cover PDF" : "Click to upload Lulu cover PDF"}
                        </p>
                        {book.lulu_cover_pdf && <p className="text-[10px] text-teal-600 mt-1">Current cover exists</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                disabled={isLoading}
                className="px-6 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center gap-2 text-sm font-normal transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
