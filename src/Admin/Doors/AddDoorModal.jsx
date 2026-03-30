import React, { useState, useEffect, useRef } from "react";
import {
  X,
  BookOpen,
  Image as ImageIcon,
  Link,
  Type,
  AlignLeft,
  Pencil,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAddDoorMutation, useUpdateDoorMutation } from "../../Api/adminApi";
import toast from "react-hot-toast";

const AddDoorModal = ({ isOpen, onClose, door }) => {
  const fileInputRef = useRef(null);
  const [addDoor, { isLoading: isAdding }] = useAddDoorMutation();
  const [updateDoor, { isLoading: isUpdating }] = useUpdateDoorMutation();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    icon: null,
    redirect_link: "",
    is_visible: true,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (door) {
      setFormData({
        title: door.title || "",
        content: door.content || "",
        icon: null,
        redirect_link: door.redirect_link || "",
        is_visible: door.is_visible ?? true,
      });
      setPreview(door.icon || "");
    } else {
      setFormData({
        title: "",
        content: "",
        icon: null,
        redirect_link: "",
        is_visible: true,
      });
      setPreview("");
    }
  }, [door, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("redirect_link", formData.redirect_link);

    data.append("is_visible", formData.is_visible);

    // Only append icon if it's a new file (File object)
    if (formData.icon instanceof File) {
      data.append("icon", formData.icon);
    }

    try {
      if (!door) {
        // Create new door
        await addDoor(data).unwrap();
        toast.success("Door created successfully!");
      } else {
        // Update existing door
        await updateDoor({ id: door.id, body: data }).unwrap();
        toast.success("Door updated successfully!");
      }

      setFormData({
        title: "",
        content: "",
        icon: null,
        redirect_link: "",
        is_visible: true,
      });
      setPreview("");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong! Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      setFormData((prev) => ({ ...prev, icon: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[550px] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#89A6A7]/10 rounded-lg">
              {door ? (
                <Pencil className="w-5 h-5 text-[#89A6A7]" />
              ) : (
                <BookOpen className="w-5 h-5 text-[#89A6A7]" />
              )}
            </div>
            <h2 className="text-neutral-900 text-xl font-bold arimo-font">
              {door ? "Edit Door" : "Add New Door"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Door Title
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="e.g. Advanced Mastery"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Description
            </label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                name="content"
                placeholder="Enter course description..."
                className="w-full min-h-[100px] pl-10 pr-4 py-3 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm resize-none"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Icon/Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Door Icon Image
            </label>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border border-black/10 rounded-2xl">
              <div className="w-16 h-16 bg-white border border-black/5 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium text-neutral-700 shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Local File</span>
                </button>
                <p className="text-[10px] text-gray-400 ml-1">
                  * JPG, PNG or SVG. Max 2MB.
                </p>
              </div>
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, icon: null }));
                    setPreview("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Course Page Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 ml-1">
              Course Page Link
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                name="redirect_link"
                placeholder="https://example.com/course"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm"
                value={formData.redirect_link}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Visible Toggle */}
          <div className="flex flex-col gap-1.5 pt-2">
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-black/10 rounded-2xl transition-all hover:bg-gray-100/50">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    formData.is_visible
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {formData.is_visible ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 arimo-font">
                    Visibility Status
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {formData.is_visible
                      ? "This door will be visible on the course page"
                      : "This door will be hidden from users"}
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
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-transparent ring-offset-2 ${
                  formData.is_visible ? "bg-[#89A6A7]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.is_visible ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 border border-black/10 rounded-xl text-sm font-medium text-neutral-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="flex-[2] h-11 bg-[#89A6A7] hover:bg-[#729394] text-white rounded-xl text-sm font-medium shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding || isUpdating
                ? "Saving..."
                : door
                  ? "Update Door"
                  : "Create Door"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoorModal;
