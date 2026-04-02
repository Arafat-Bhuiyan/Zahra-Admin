import React, { useState, useEffect } from "react";
import { X, Edit3, Save, ChevronDown, Eye, EyeOff } from "lucide-react";
import QuillEditor from "../../components/QuillEditor";

const EditBookModal = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorDesignation: "",
    description: "",
    category: "",
    price: "",
    type: "",
    is_visible: true,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        authorDesignation: book.authorDesignation || "",
        description: book.description || "",
        category: book.category || "",
        price: book.price || "",
        type: book.type || "",
        is_visible: book.is_visible ?? true,
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                        className={`p-2 rounded-lg transition-colors ${
                          formData.is_visible
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
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ring-2 ring-transparent ring-offset-2 ${
                        formData.is_visible ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          formData.is_visible
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
