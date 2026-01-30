import React, { useState, useEffect } from "react";
import { X, User, Mail, Briefcase, ShieldCheck, Lock } from "lucide-react";

const AddUserModal = ({ isOpen, onClose, type, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: type === "students" ? "student" : "teacher",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: type === "students" ? "student" : "teacher",
    }));
  }, [type]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    // For teacher, department is required
    if (type === "teachers" && !formData.department) return;

    onAdd({
      ...formData,
      id: Date.now(), // simple ID generation
      courses: 0,
      students: 0,
      joined: new Date().toISOString().split("T")[0],
      status: "active",
    });

    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      role: type === "students" ? "student" : "teacher",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
          <div className="flex flex-col">
            <h2 className="text-neutral-900 text-xl font-bold arimo-font">
              Add New {type === "students" ? "Student" : "Teacher"}
            </h2>
            <p className="text-gray-500 text-sm arimo-font">
              Enter the details to create a new platform user
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-neutral-400 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 arimo-font ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Abdullah Rahman"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm arimo-font"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 arimo-font ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="e.g. abdullah@example.com"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm arimo-font"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 arimo-font ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm arimo-font"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Department Field (Teachers Only) */}
          {type === "teachers" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 arimo-font ml-1">
                Department / Expertise
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Islamic Psychology"
                  className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A6A7]/20 focus:border-[#89A6A7] transition-all text-sm arimo-font"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  required={type === "teachers"}
                />
              </div>
            </div>
          )}

          {/* Role (Read Only / Contextual) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 arimo-font ml-1">
              Assigned Role
            </label>
            <div className="relative opacity-60">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full h-11 pl-10 pr-4 bg-gray-100 border border-black/5 rounded-xl text-sm arimo-font capitalize cursor-not-allowed"
                value={formData.role}
                readOnly
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 border border-black/10 rounded-xl text-sm font-medium text-neutral-600 hover:bg-gray-50 transition-colors arimo-font"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] h-11 bg-[#89A6A7] hover:bg-[#729394] text-white rounded-xl text-sm font-medium transition-all shadow-md active:scale-[0.98] arimo-font"
            >
              Confirm and Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
