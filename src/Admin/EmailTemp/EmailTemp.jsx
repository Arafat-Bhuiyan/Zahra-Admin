import React, { useState } from "react";
import { Plus, FileText, Search, Filter } from "lucide-react";
import CreateTemplateModal from "./CreateTemplateModal";
import EditTemplateModal from "./EditTemplateModal";
import TemplateCard from "./TemplateCard";
import toast from "react-hot-toast";

const EmailTemplates = () => {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isEditTemplateModalOpen, setIsEditTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "User Registration Confirmation",
      tag: "registration",
      tagColor: "bg-blue-100 text-blue-700",
      subject: "Welcome to LearnHub! Confirm Your Email",
      preview:
        "Hi {{name}}, Thank you for joining LearnHub! Please confirm your email address by clicking the link below: {{confirmation_link}} Best regards, LearnHub Team",
      used: 847,
      modified: "2026-01-15",
    },
    {
      id: 2,
      title: "Welcome Email",
      tag: "welcome",
      tagColor: "bg-green-100 text-green-700",
      subject: "Welcome to LearnHub - Start Your Learning Journey",
      preview:
        "Hi {{name}}, Welcome to LearnHub! We're excited to have you in our learning community. Explore our courses and start learning today! Best regards, LearnHub Team",
      used: 823,
      modified: "2026-01-10",
    },
    {
      id: 3,
      title: "Password Reset",
      tag: "password-reset",
      tagColor: "bg-red-100 text-red-700",
      subject: "Reset Your LearnHub Password",
      preview:
        "Hi {{name}}, We received a request to reset your password. Click the link below to create a new password: {{reset_link}} If you didn't request this, please ignore this email. Best regards, LearnHub Team",
      used: 156,
      modified: "2026-01-08",
    },
    {
      id: 4,
      title: "Course Enrollment Confirmation",
      tag: "course-enrollment",
      tagColor: "bg-purple-100 text-purple-700",
      subject: "You're Enrolled! {{course_name}}",
      preview:
        "Hi {{name}}, Congratulations! You're now enrolled in {{course_name}}. Access your course here: {{course_link}} Happy learning! LearnHub Team",
      used: 542,
      modified: "2026-01-12",
    },
  ]);

  const handleSaveTemplate = (newTemplate) => {
    setTemplates((prev) => [newTemplate, ...prev]);
    toast.success("Template created successfully!");
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setIsEditTemplateModalOpen(true);
  };

  const handleUpdateTemplate = (updatedTemplate) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t)),
    );
    toast.success("Template updated successfully!");
  };

  const handleDeleteTemplate = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this template?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setTemplates((prev) => prev.filter((t) => t.id !== id));
                toast.dismiss(t.id);
                toast.success("Template deleted successfully!", {
                  icon: "🗑️",
                  style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "350px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    );
  };

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-slate-50/10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center">
        <button
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 inter-font whitespace-nowrap"
        >
          <Plus size={20} />
          <span className="font-semibold text-sm">Create New Template</span>
        </button>
      </div>

      <CreateTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSave={handleSaveTemplate}
      />

      <EditTemplateModal
        isOpen={isEditTemplateModalOpen}
        onClose={() => {
          setIsEditTemplateModalOpen(false);
          setSelectedTemplate(null);
        }}
        onSave={handleUpdateTemplate}
        template={selectedTemplate}
      />

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, subject or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#7BA0A0]/20 focus:border-[#7BA0A0] transition-all bg-white"
          />
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-neutral-200 text-neutral-600 font-medium">
          <Filter size={18} />
          <span>Filter</span>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search size={32} className="text-neutral-300" />
          </div>
          <h3 className="text-lg font-bold text-neutral-800">
            No templates found
          </h3>
          <p className="text-neutral-500 max-w-xs mt-1">
            We couldn't find any email templates matching your current search.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
