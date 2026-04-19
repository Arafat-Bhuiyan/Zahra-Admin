import React, { useState } from "react";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import CreatePopupAnnouncementModal from "./CreatePopupAnnouncementModal";
import EditPopupAnnouncementModal from "./EditPopupAnnouncementModal";
import { 
  useGetSiteAnnouncementsQuery, 
  useDeleteSiteAnnouncementMutation,
  useGetCoursesDataQuery,
  useGetCourseAnnouncementsQuery,
  useDeleteCourseAnnouncementMutation,
} from "../../Api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

import {
  Plus,
  Bell,
  Trash2,
  Calendar,
  User,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  ChevronLeft,
  BookOpen,
  Edit2
} from "lucide-react";

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const parseList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Not a JSON array, treat as single string
      }
      return [data];
    }
    return [];
  };

  const badgeList = parseList(announcement.badges);
  const highlightList = parseList(announcement.checklist || announcement.highlights);
  const formattedDate = announcement.publishedDate || (announcement.created_at ? new Date(announcement.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "Recently");

  return (
    <div
      className={`w-full bg-white rounded-[2.5rem] shadow-sm border border-black/5 flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-xl group relative ${!announcement.isActive && announcement.is_active !== undefined && !announcement.is_active ? "opacity-75 grayscale-[0.5]" : ""}`}
    >
      {/* Badge Overlay */}
      <div className="absolute top-6 left-4 z-10 flex flex-wrap gap-2">
        {badgeList.map((badge, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#7AA4A5] text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-black/5"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Image Section */}
      <div className="w-full md:w-72 h-48 md:h-auto relative overflow-hidden shrink-0 bg-gray-50 border-r border-black/5">
        {announcement.imagePath || announcement.image ? (
          <img
            src={announcement.imagePath || announcement.image}
            alt={announcement.titleScript || announcement.main_title}
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
              {/* Force minimum height/content so it never looks blank */}
              <p className="text-[#7AA4A5] text-xs font-bold uppercase tracking-[0.2em] min-h-[16px]">
                {announcement.titlePrefix || announcement.title_prefix || "Announcement"}
              </p>
              <h2 className="text-3xl font-black text-neutral-900 leading-tight arimo-font">
                {announcement.titleScript || announcement.main_title}
              </h2>
            </div>
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(announcement)}
                  className="p-2.5 text-neutral-400 hover:text-[#7AA4A5] hover:bg-[#7AA4A5]/5 rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
              )}
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

          {/* Highlights */}
          {highlightList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 py-2">
              {highlightList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-neutral-600 text-xs font-bold"
                >
                  <CheckCircle2 size={14} className="text-[#7AA4A5] shrink-0" />
                  <span className="truncate">{item}</span>
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
              <span>{formattedDate}</span>
            </div>
            {(announcement.author || announcement.created_at) && (
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#7AA4A5]" />
                <span>{announcement.author || "Admin"}</span>
              </div>
            )}
            {announcement.isActive === false || announcement.is_active === false ? (
              <span className="px-3 py-1 bg-gray-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                Inactive
              </span>
            ) : null}
          </div>

          <a
            href={announcement.ctaLink || announcement.cta_link || "#"}
            className="px-6 py-2.5 bg-[#7AA4A5] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#7AA4A5]/20 hover:bg-[#6A9495] transition-all active:scale-95 flex items-center gap-2"
          >
            {announcement.ctaText || announcement.cta_text || "Learn More"}
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

const CourseAnnouncementCard = ({ announcement, onDelete }) => {
  const formattedDate = announcement.created_at ? new Date(announcement.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Recently";

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-black/5 p-6 hover:shadow-lg transition-all relative group">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 arimo-font">{announcement.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <div className="flex items-center gap-1.5">
              <User size={12} className="text-[#7AA4A5]" />
              <span>{announcement.created_by_name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#7AA4A5]" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(announcement.id)}
          className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <p className="text-neutral-600 text-sm font-medium leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-black/5 whitespace-pre-wrap">
        {announcement.body}
      </p>
    </div>
  );
};

const Announcement = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  
  const [isModalOpen, setIsModalOpen] = useState(false); // For Course Announcement Creates
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);

  // Popups Data
  const { data: popupsData, isLoading: isPopupsLoading } = useGetSiteAnnouncementsQuery({ page: currentPage });
  const [deleteSiteAnnouncement] = useDeleteSiteAnnouncementMutation();
  const popups = popupsData?.results || [];

  // Course Announcements Data
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursePage, setCoursePage] = useState(1);
  const [courseAnnouncementPage, setCourseAnnouncementPage] = useState(1);

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCoursesDataQuery({ page: coursePage });
  const { data: courseAnnsData, isLoading: isCourseAnnsLoading } = useGetCourseAnnouncementsQuery(
    { course_pk: selectedCourse?.id, page: courseAnnouncementPage },
    { skip: !selectedCourse }
  );
  const [deleteCourseAnnouncement] = useDeleteCourseAnnouncementMutation();
  
  const coursesList = coursesData?.results || [];
  const courseAnnouncementsList = courseAnnsData?.results || [];

  const handleEditPopupTrigger = (popup) => {
    setCurrentPopup(popup);
    setIsEditPopupOpen(true);
  };

  const handleRemove = (id, type) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 p-1 arimo-font">
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-800 inter-font">
              Confirm Delete
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Are you sure you want to remove this {type}?
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
              onClick={async () => {
                if (type === "popup") {
                  try {
                    await deleteSiteAnnouncement(id).unwrap();
                    toast.success("Site popup removed successfully");
                  } catch (err) {
                    toast.error("Failed to delete popup");
                  }
                } else if (type === "course_announcement") {
                  try {
                    await deleteCourseAnnouncement({ course_pk: selectedCourse.id, id }).unwrap();
                    toast.success("Course announcement removed successfully");
                  } catch (err) {
                    toast.error("Failed to delete announcement");
                  }
                }
                toast.dismiss(t.id);
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

  // Prevent user from clicking "New Campaign" if they haven't picked a course when on course tab
  const canShowNewButton = activeTab === "popups" || (activeTab === "announcements" && selectedCourse);

  const handleNewButtonClick = () => {
    if (activeTab === "announcements") {
      setIsModalOpen(true);
    } else {
      setIsCreatePopupOpen(true);
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen arimo-font bg-gray-50/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-black/5 shadow-sm">
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "announcements" ? "bg-[#7AA4A5] text-white shadow-lg" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            Course Announcements
          </button>
          <button
            onClick={() => setActiveTab("popups")}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "popups" ? "bg-[#7AA4A5] text-white shadow-lg" : "text-neutral-400 hover:text-neutral-600"}`}
          >
            Popups
          </button>
        </div>

        {canShowNewButton && (
          <button
            onClick={handleNewButtonClick}
            className="flex items-center gap-2 bg-[#7AA4A5] hover:bg-[#6A8F8F] text-white px-8 py-3.5 rounded-2xl shadow-xl shadow-[#7AA4A5]/20 transition-all active:scale-95 text-xs font-black uppercase tracking-widest"
          >
            <Plus size={18} />
            {activeTab === "announcements" ? "New Course Notice" : "New Popup"}
          </button>
        )}
      </div>

      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coursePk={selectedCourse?.id}
      />

      <CreatePopupAnnouncementModal
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />

      <EditPopupAnnouncementModal
        isOpen={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setCurrentPopup(null);
        }}
        announcement={currentPopup}
      />

      {/* Content */}
      {activeTab === "announcements" && (
        <div className="animate-in fade-in duration-500">
          {!selectedCourse ? (
             <div className="space-y-6">
               <h2 className="text-xl font-bold text-neutral-800">Select a Course to Manage Announcements</h2>
               
               {isCoursesLoading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1,2,3,4].map(skele => (
                       <div key={skele} className="h-64 bg-white rounded-2xl border border-black/5 animate-pulse"></div>
                    ))}
                 </div>
               ) : coursesList.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-black/5">
                    <BookOpen className="w-16 h-16 text-gray-200 mb-4" />
                    <p className="text-neutral-400 font-bold">
                      No courses found.
                    </p>
                  </div>
               ) : (
                 <>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {coursesList.map((course) => (
                         <div 
                           key={course.id}
                           onClick={() => {
                             setSelectedCourse(course);
                             setCourseAnnouncementPage(1);
                           }}
                           className="bg-white rounded-3xl p-6 border border-black/5 hover:border-[#7AA4A5] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[220px]"
                         >
                            <div>
                               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                  <BookOpen size={24} />
                               </div>
                               <h3 className="font-bold text-lg text-neutral-800 line-clamp-2 leading-tight mb-2 group-hover:text-[#7AA4A5] transition-colors">{course.title}</h3>
                               {course.category && (
                                  <span className="text-xs font-bold bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {course.category.name}
                                  </span>
                               )}
                            </div>
                            <div className="flex items-center gap-2 mt-5 text-sm text-neutral-500 font-medium border-t border-black/5 pt-4">
                               <img src={course.teacher?.profile_picture} alt="" className="w-6 h-6 rounded-full object-cover" onError={(e) => e.target.style.display='none'}/>
                               <span className="truncate">{course.teacher?.user?.first_name} {course.teacher?.user?.last_name}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                   {coursesData?.total_pages > 1 && (
                      <Pagination
                        currentPage={coursePage}
                        totalPages={coursesData.total_pages}
                        onPageChange={setCoursePage}
                      />
                   )}
                 </>
               )}
             </div>
          ) : (
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 bg-white hover:bg-gray-100 border border-black/5 rounded-xl transition-colors"
                  >
                     <ChevronLeft size={20} className="text-neutral-600" />
                  </button>
                  <div>
                    <p className="text-xs font-bold text-[#7AA4A5] uppercase tracking-widest">Managing Announcements For</p>
                    <h2 className="text-2xl font-black text-neutral-900 arimo-font">{selectedCourse.title}</h2>
                  </div>
                </div>

                {isCourseAnnsLoading ? (
                  <div className="space-y-4">
                    {[1,2].map((s) => <div key={s} className="h-32 bg-white rounded-2xl border border-black/5 animate-pulse"></div>)}
                  </div>
                ) : courseAnnouncementsList.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-black/5 shadow-sm">
                    <Bell className="w-16 h-16 text-gray-200 mb-4" />
                    <p className="text-neutral-400 font-bold mb-6">
                      No notices have been posted for this course yet.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-6 py-2.5 bg-[#7AA4A5]/10 text-[#7AA4A5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#7AA4A5]/20 transition-colors"
                    >
                      Create First Notice
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                     {courseAnnouncementsList.map((ann) => (
                        <CourseAnnouncementCard 
                          key={ann.id}
                          announcement={ann}
                          onDelete={(id) => handleRemove(id, "course_announcement")}
                        />
                     ))}
                  </div>
                )}
                {courseAnnsData?.total_pages > 1 && (
                  <Pagination 
                     currentPage={courseAnnouncementPage}
                     totalPages={courseAnnsData.total_pages}
                     onPageChange={setCourseAnnouncementPage}
                  />
                )}
             </div>
          )}
        </div>
      )}

      {activeTab === "popups" && (
        <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-700">
          {isPopupsLoading ? (
            <div className="h-[200px] w-full bg-neutral-100 rounded-[2.5rem] animate-pulse"></div>
          ) : popups.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] border border-black/5">
              <Bell className="w-16 h-16 text-gray-200 mb-4" />
              <p className="text-neutral-400 font-bold">
                No active popup campaigns found.
              </p>
            </div>
          ) : (
            <>
              {popups.map((popup) => (
                <AnnouncementCard
                  key={popup.id}
                  announcement={popup}
                  onEdit={(p) => handleEditPopupTrigger(p)}
                  onDelete={(id) => handleRemove(id, "popup")}
                />
              ))}
              {popupsData?.total_pages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={popupsData.total_pages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Announcement;
