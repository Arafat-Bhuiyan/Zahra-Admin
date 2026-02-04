import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  User,
  Eye,
  Play,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UploadContent from "./UploadContent";
import UploadVideo from "./UploadVideo";

const Contents = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(null); // 'article', 'video', or null

  const [contentsList, setContentsList] = useState([
    {
      id: 1,
      type: "Article",
      thumbnail:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop",
      date: "Dec 22, 2025",
      readTime: "6 min read",
      category: "Relationships",
      title: "Building Healthy Relationships Through Islamic Values",
      description:
        "Learn how Islamic principles can strengthen your family bonds and improve communication.",
      author: "Dr. Sarah Ahmed",
      status: "Pending",
    },
    {
      id: 2,
      type: "Article",
      thumbnail:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop",
      date: "Dec 20, 2025",
      readTime: "8 min read",
      category: "Mental Health",
      title: "Healing Trauma with Faith and Professional Support",
      description:
        "Combining Islamic spiritual practices with evidence-based therapeutic approaches for trauma recovery.",
      author: "Admin",
      status: "Approved",
    },
    {
      id: 3,
      type: "Video",
      thumbnail:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
      title: "Welcome to Sakeena Institute",
      description:
        "Discover how we integrate Islamic wisdom with modern psychological practices for holistic healing.",
      duration: "12:45",
    },
  ]);

  const handleToggleStatus = (id) => {
    setContentsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Approved" ? "Pending" : "Approved",
            }
          : item,
      ),
    );
  };

  const handleSaveContent = (newItem) => {
    setContentsList((prev) => [newItem, ...prev]);
    setShowUploadForm(null);
  };

  if (showUploadForm === "article") {
    return (
      <UploadContent
        onSave={handleSaveContent}
        onBack={() => setShowUploadForm(null)}
      />
    );
  }

  if (showUploadForm === "video") {
    return (
      <UploadVideo
        onSave={handleSaveContent}
        onBack={() => setShowUploadForm(null)}
      />
    );
  }

  return (
    <div className="pt-2 flex flex-col gap-8 animate-in fade-in duration-500 pb-10 arimo-font">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <div className="flex items-center gap-4 inter-font">
          <button
            onClick={() => setShowUploadForm("article")}
            className="w-56 h-7 px-2 py-1 bg-greenTeal rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/0 inline-flex justify-center items-center gap-1.5 hover:opacity-90 transition-all font-semibold"
          >
            <span className="text-center text-white text-sm font-semibold leading-5">
              Upload New Content
            </span>
          </button>
          <button
            onClick={() => setShowUploadForm("video")}
            className="w-56 h-7 px-2 py-1 bg-gray-200 rounded-2xl inline-flex justify-center items-center gap-1.5 hover:bg-gray-300 transition-all font-semibold"
          >
            <span className="text-center text-neutral-950 text-sm font-semibold leading-5">
              Upload New Video
            </span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            className="w-full h-11 pl-12 pr-4 bg-white border border-neutral-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7AA4A5]/20 focus:border-[#7AA4A5] transition-all text-base text-neutral-900 placeholder:text-neutral-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-2.5 bg-white rounded-[10px] border border-neutral-300 hover:bg-neutral-50 transition-colors">
          <Filter className="w-5 h-5 text-neutral-500" />
        </button>
        <button className="min-w-[120px] px-4 h-11 bg-white border border-neutral-300 rounded-[10px] flex items-center justify-between text-neutral-500 font-normal">
          All
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentsList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative h-[227px] w-full overflow-hidden">
              {item.type === "Video" && item.thumbnail?.startsWith("blob:") ? (
                <video
                  src={item.thumbnail}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={item.thumbnail}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  alt={item.title}
                />
              )}
              {item.type === "Video" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                  <div
                    onClick={() => navigate(`/admin/contents/${item.id}`)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 backdrop-blur-sm"
                  >
                    <Play className="w-6 h-6 text-slate-600 fill-slate-600 ml-1" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded text-white text-xs font-bold">
                    {item.duration}
                  </div>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col gap-3">
              {item.type === "Article" && (
                <>
                  <div className="flex items-center gap-4 text-stone-500 text-xs font-normal">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </div>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-white border border-teal-200 rounded-lg text-slate-600 text-xs font-medium w-fit">
                    {item.category}
                  </div>
                </>
              )}

              <h3
                className={`text-stone-900 font-bold leading-7 line-clamp-2 ${item.type === "Video" ? "text-lg pt-1" : "text-lg"}`}
              >
                {item.title}
              </h3>

              <p className="text-stone-600 text-sm leading-6 line-clamp-2">
                {item.description}
              </p>

              {item.type === "Article" && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <span className="text-stone-600 text-xs font-normal italic">
                    {item.author}
                  </span>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {item.type === "Article" && (
              <div className="px-5 py-4 bg-neutral-50 border-t border-black/10 flex items-center justify-end gap-3">
                <button
                  onClick={() => navigate(`/admin/contents/${item.id}`)}
                  className="p-2 border border-slate-400 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <Eye className="w-5 h-4" />
                </button>
                {item.status === "Pending" ? (
                  <button
                    onClick={() => handleToggleStatus(item.id)}
                    className="px-6 py-2 bg-white border border-slate-400 rounded-lg text-slate-500 text-sm font-medium hover:bg-[#7AA4A5] hover:text-white hover:border-[#7AA4A5] transition-all"
                  >
                    Approve
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-green-600 text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Approved
                    </div>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className="px-4 py-1.5 bg-white border border-red-200 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
