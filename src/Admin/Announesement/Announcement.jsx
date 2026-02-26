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
  ExternalLink,
  CheckCircle2,
  Tag,
  Image as ImageIcon,
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
  return (
    <div
      className={`w-full bg-white rounded-[2.5rem] shadow-sm border border-black/5 flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-xl group relative ${!announcement.isActive ? "opacity-75 grayscale-[0.5]" : ""}`}
    >
      {/* Badge Overlay */}
      <div className="absolute top-6 left-4 z-10 flex flex-wrap gap-2">
        {announcement.badges?.map((badge, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#7AA4A5] text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-black/5"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Image Section */}
      <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden shrink-0">
        {announcement.imagePath ? (
          <img
            src={announcement.imagePath}
            alt={announcement.titleScript}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-gradient-to-t" />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[#7AA4A5] text-xs font-bold uppercase tracking-[0.2em]">
                {announcement.titlePrefix}
              </p>
              <h2 className="text-3xl font-black text-neutral-900 leading-tight arimo-font">
                {announcement.titleScript}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(announcement)}
                className="p-2.5 text-neutral-400 hover:text-[#7AA4A5] hover:bg-[#7AA4A5]/5 rounded-xl transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(announcement.id)}
                className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl font-medium">
            {announcement.message}
          </p>

          {/* Checklist */}
          {announcement.checklist?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 py-2">
              {announcement.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-neutral-600 text-xs font-bold"
                >
                  <CheckCircle2 size={14} className="text-[#7AA4A5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-black/5">
          <div className="flex items-center gap-6 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#7AA4A5]" />
              <span>{announcement.publishedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#7AA4A5]" />
              <span>{announcement.author}</span>
            </div>
            {!announcement.isActive && (
              <span className="px-3 py-1 bg-gray-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                Inactive
              </span>
            )}
          </div>

          <a
            href={announcement.ctaLink}
            className="px-6 py-2.5 bg-[#7AA4A5] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#7AA4A5]/20 hover:bg-[#6A9495] transition-all active:scale-95 flex items-center gap-2"
          >
            {announcement.ctaText}
            <ExternalLink size={12} />
          </a>
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
      titlePrefix: "Discover our new",
      titleScript: "Islamic Psychology",
      message:
        "Master the intersection of faith and science in our latest certified course module.",
      checklist: [
        "Certified Curriculum",
        "Lifetime Access",
        "Expert Instructors",
      ],
      badges: ["Certified", "New", "Educational"],
      ctaText: "Explore Course",
      ctaLink: "/admin/courses-management",
      imagePath:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
      isActive: true,
      publishedDate: "2026-02-20",
      author: "Admin User",
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
              Are you sure you want to remove this campaign?
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
                toast.success("Campaign removed successfully");
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
      title: "Total Campaigns",
      count: announcements.length,
      bgColor: "bg-[#7AA4A5]/10",
      iconColor: "text-[#7AA4A5]",
    },
    {
      icon: CheckCircle2,
      title: "Active Now",
      count: announcements.filter((a) => a.isActive).length,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Course Promos",
      count: announcements.length,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: Tag,
      title: "Total Badges",
      count: announcements.reduce(
        (acc, curr) => acc + (curr.badges?.length || 0),
        0,
      ),
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-gray-50/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-black/5 shadow-sm">
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "announcements" ? "bg-[#7AA4A5] text-white shadow-lg" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab("popups")}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "popups" ? "bg-[#7AA4A5] text-white shadow-lg" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            Popups
          </button>
        </div>

        <button
          onClick={() =>
            activeTab === "announcements"
              ? setIsModalOpen(true)
              : setIsCreatePopupOpen(true)
          }
          className="flex items-center gap-2 bg-[#7AA4A5] hover:bg-[#6A8F8F] text-white px-8 py-3.5 rounded-2xl shadow-xl shadow-[#7AA4A5]/20 transition-all active:scale-95 text-xs font-black uppercase tracking-widest"
        >
          <Plus size={18} />
          {activeTab === "announcements" ? "New Campaign" : "New Popup"}
        </button>
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

      {/* Content */}
      {activeTab === "announcements" && (
        <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-700">
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
            <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-black/5">
              <Bell className="w-16 h-16 text-gray-200 mb-4" />
              <p className="text-neutral-400 font-bold">
                No active popup campaigns found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {popups.map((p) => (
                <div
                  key={p.id}
                  className="p-6 bg-white rounded-[2.5rem] border border-black/5 shadow-sm"
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
