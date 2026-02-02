import React, { useState } from "react";
import {
  Plus,
  Mail,
  FileText,
  Users,
  Eye,
  Send,
  Calendar,
  Search,
} from "lucide-react";
import CreateNewsletterModal from "./CreateNewsletterModal";
import CreateTemplateModal from "./CreateTemplateModal";
import EditTemplateModal from "./EditTemplateModal";
import ViewNewsletterModal from "./ViewNewsletterModal";
import TemplateCard from "./TemplateCard";
import SubscribersList from "./SubscribersList";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [activeTab, setActiveTab] = useState("Newsletters");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isEditTemplateModalOpen, setIsEditTemplateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: "January 2026 Course Updates",
      subject: "New Courses & Features This Month",
      preview:
        "Check out our latest courses in Web Development, Data Science, and Design...",
      status: "sent",
      date: "2026-01-10",
    },
    {
      id: 2,
      title: "Top Student Success Stories",
      subject: "How Our Students Achieved Their Goals",
      preview: "Inspiring stories from our community...",
      status: "sent",
      date: "2026-01-05",
    },
    {
      id: 3,
      title: "February Course Preview",
      subject: "Exciting New Courses Coming Soon!",
      preview: "Get ready for our February lineup...",
      status: "draft",
    },
  ]);

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

  const handleSendNow = (id) => {
    setNewsletters((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: "sent",
              date: new Date().toISOString().split("T")[0],
            }
          : n,
      ),
    );
    toast.success("Newsletter sent successfully!");
  };

  const handleSaveDraft = (newNewsletter) => {
    setNewsletters((prev) => [newNewsletter, ...prev]);
    toast.success("Saved as draft!");
  };

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

  const handlePreview = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsPreviewModalOpen(true);
  };

  const handleMainButtonClick = () => {
    if (activeTab === "Templates") {
      setIsTemplateModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const tabs = [
    { id: "Newsletters", icon: Mail, label: "Newsletters" },
    { id: "Templates", icon: FileText, label: "Email Templates" },
    { id: "Subscribers", icon: Users, label: "Subscribers" },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-slate-50/10">
      {/* Header */}
      <div className="flex justify-end items-center">
        <button
          onClick={handleMainButtonClick}
          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 inter-font"
        >
          <Plus size={20} />
          <span className="font-semibold">
            {activeTab === "Templates"
              ? "Create Template"
              : "Create Newsletter"}
          </span>
        </button>
      </div>

      <CreateNewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDraft}
      />

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

      <ViewNewsletterModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedNewsletter(null);
        }}
        newsletter={selectedNewsletter}
      />

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Tabs Bar */}
        <div className="px-6 pt-6 border-b border-neutral-100">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-[#7BA0A0] text-white shadow-sm"
                      : "text-neutral-500 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8 flex-1">
          {activeTab === "Newsletters" && (
            <div className="space-y-4">
              {newsletters.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-white rounded-2xl border border-neutral-200 flex flex-col gap-4 transition-all hover:shadow-md group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-neutral-800 text-xl font-bold">
                          {item.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status === "sent"
                              ? "bg-green-100 text-green-700"
                              : "bg-neutral-100 text-neutral-600 font-bold"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-sm font-medium">
                        Subject: {item.subject}
                      </p>
                      <p className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
                        {item.preview}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.status === "draft" && (
                        <button
                          onClick={() => handleSendNow(item.id)}
                          className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
                        >
                          <Send size={16} />
                          Send Now
                        </button>
                      )}
                      <button
                        onClick={() => handlePreview(item)}
                        className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>

                  {item.status === "sent" && (
                    <div className="flex items-center gap-2 text-neutral-400 text-sm pt-2 border-t border-neutral-50/50">
                      <Calendar size={16} />
                      <span>Sent: {item.date}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Templates */}
          {activeTab === "Templates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEditTemplate}
                  onDelete={handleDeleteTemplate}
                />
              ))}
            </div>
          )}

          {/* Subscribers */}
          {activeTab === "Subscribers" && <SubscribersList />}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
