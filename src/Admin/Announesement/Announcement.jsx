import React, { useState } from "react";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import EditAnnouncementModal from "./EditAnnouncementModal";
import CreatePopupAnnouncementModal from "./CreatePopupAnnouncementModal";
import PopupAnnouncement from "./PopupAnnouncement";
import toast from "react-hot-toast";

import {
  Plus,
  Bell,
  AlertCircle,
  BookOpen,
  Edit2,
  Trash2,
  Calendar,
  User,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";

const StatCard = ({ icon: Icon, title, count, bgColor, iconColor }) => (
  <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-center gap-4">
    <div
      className={`w-12 h-12 ${bgColor} rounded-full flex justify-center items-center`}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <p className="text-neutral-500 text-sm font-medium">{title}</p>
      <h3 className="text-neutral-800 text-2xl font-bold">{count}</h3>
    </div>
  </div>
);

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const isUrgent = announcement.isUrgent;

  return (
    <div
      className={`w-full p-6 bg-white rounded-2xl shadow-sm border-2 ${isUrgent ? "border-red-200 bg-red-50/10" : "border-neutral-200"} flex flex-col gap-4 transition-all hover:shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap gap-2 items-center">
          {isUrgent && (
            <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 uppercase tracking-wider">
              <AlertCircle size={12} />
              Urgent
            </div>
          )}
          {announcement.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
          <div className="flex gap-2 ml-2">
            {announcement.deliveryMethods.includes("On-Site") && (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-[10px] font-medium rounded">
                <MapPin size={10} /> On-Site
              </span>
            )}
            {announcement.deliveryMethods.includes("Email") && (
              <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                <Mail size={10} /> Email
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-neutral-800 text-xl font-bold font-['Arimo']">
          {announcement.title}
        </h2>
        <p className="text-neutral-600 text-sm font-medium">
          {announcement.subtitle}
        </p>
      </div>

      <p className="text-neutral-500 text-sm leading-relaxed max-w-4xl">
        {announcement.description}
      </p>

      <div className="flex flex-wrap items-center gap-6 pt-2 text-neutral-400 text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Published: {announcement.publishedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>By {announcement.author}</span>
        </div>
      </div>
    </div>
  );
};

const Announcement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [activeTab, setActiveTab] = useState("announcements");
  const [popups, setPopups] = useState([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Course Module Released",
      subtitle: "Module 5 on Advanced Hooks is now available",
      description:
        "We're excited to announce that Module 5 covering Advanced React Hooks is now live! This module includes useState, useEffect, useContext, and custom hooks.",
      publishedDate: "2026-01-15",
      author: "Admin User",
      isUrgent: false,
      tags: [
        {
          label: "Advanced React Patterns",
          color: "bg-blue-100 text-blue-700",
        },
      ],
      deliveryMethods: ["On-Site", "Email"],
    },
    {
      id: 2,
      title: "Platform Maintenance Scheduled",
      subtitle: "System will be down for maintenance on Jan 20",
      description:
        "Our platform will undergo scheduled maintenance on January 20, 2026 from 2:00 AM to 4:00 AM EST. All courses will be temporarily unavailable during this time.",
      publishedDate: "2026-01-14",
      author: "Admin User",
      isUrgent: true,
      tags: [
        { label: "Platform-Wide", color: "bg-purple-100 text-purple-700" },
      ],
      deliveryMethods: ["On-Site", "Email"],
    },
    {
      id: 3,
      title: "Assignment Deadline Extension",
      subtitle: "Week 3 assignment deadline extended by 48 hours",
      description:
        "Due to popular request, we've extended the Week 3 assignment deadline by 48 hours. The new deadline is January 18, 2026 at 11:59 PM.",
      publishedDate: "2026-01-13",
      author: "Admin User",
      isUrgent: false,
      tags: [
        {
          label: "Data Science Fundamentals",
          color: "bg-blue-100 text-blue-700",
        },
      ],
      deliveryMethods: ["On-Site"],
    },
    {
      id: 4,
      title: "Live Q&A Session Tomorrow",
      subtitle: "Join us for a live Q&A with the instructor",
      description:
        "Don't miss our live Q&A session tomorrow at 3:00 PM EST! The instructor will answer your questions about Figma workflows and best practices.",
      publishedDate: "2026-01-12",
      author: "Admin User",
      isUrgent: true,
      tags: [
        {
          label: "UI/UX Design Masterclass",
          color: "bg-blue-100 text-blue-700",
        },
      ],
      deliveryMethods: ["On-Site", "Email"],
    },
  ]);

  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleCreatePopup = (popup) => {
    setPopups((prev) => [popup, ...prev]);
  };

  const handleRemoveAnnouncement = (id) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1 arimo-font">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this announcement?
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
                setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
                toast.dismiss(t.id);
                toast.success("Announcement removed successfully", {
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
          minWidth: "400px",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    );
  };

  const handleUpdateAnnouncement = (updatedAnnouncement) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === updatedAnnouncement.id ? updatedAnnouncement : ann,
      ),
    );
  };

  const handleEditTrigger = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  const getStats = () => [
    {
      icon: Bell,
      title: "Total Announcements",
      count: announcements.length,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: AlertCircle,
      title: "Urgent",
      count: announcements.filter((a) => a.isUrgent).length,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "Course Specific",
      count: announcements.filter((a) =>
        a.tags.some((t) => t.label !== "Platform-Wide"),
      ).length,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Globe,
      title: "Platform Wide",
      count: announcements.filter((a) =>
        a.tags.some((t) => t.label === "Platform-Wide"),
      ).length,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "announcements" ? "bg-slate-100" : "bg-white"}`}
          >
            Announcements
          </button>
          <button
            onClick={() => setActiveTab("popups")}
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "popups" ? "bg-slate-100" : "bg-white"}`}
          >
            Popup Announcements
          </button>
        </div>

        <div className="flex items-center">
          {activeTab === "announcements" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#7BA0A0] hover:bg-[#6A8F8F] text-white px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Plus size={20} />
              <span className="font-semibold">New Announcement</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsCreatePopupOpen(true)}
                className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 mr-3"
              >
                <Plus size={16} />
                <span className="font-semibold">New Popup</span>
              </button>
            </>
          )}
        </div>
      </div>

      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAnnouncement}
      />

      <EditAnnouncementModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCurrentAnnouncement(null);
        }}
        announcement={currentAnnouncement}
        onUpdate={handleUpdateAnnouncement}
      />

      <CreatePopupAnnouncementModal
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
        onCreate={handleCreatePopup}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content: announcements OR popups */}
      {activeTab === "announcements" && (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEditTrigger}
              onDelete={handleRemoveAnnouncement}
            />
          ))}
        </div>
      )}

      {activeTab === "popups" && (
        <div className="space-y-6">
          {popups.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-neutral-200 text-neutral-600">
              No popup announcements yet. Click <strong>New Popup</strong> to
              create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popups.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-2xl border border-neutral-200"
                >
                  <PopupAnnouncement
                    {...p}
                    onClose={() =>
                      setPopups((prev) => prev.filter((x) => x.id !== p.id))
                    }
                    showClose={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Announcement;
