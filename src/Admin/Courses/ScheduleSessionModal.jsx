import React, { useState } from "react";
import {
  X,
  Video,
  BookOpen,
  Calendar,
  Clock,
  User,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

const ScheduleSessionModal = ({ isOpen, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    course: "",
    title: "",
    day: "",
    startTime: "",
    endTime: "",
    zoomLink: "",
    teacher: "",
    teacherEmail: "",
  });

  if (!isOpen) return null;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const teachers = [
    { name: "Fatima Ara", email: "fatimaara10@gmail.com" },
    { name: "Dr. Jannat Ara", email: "jannatara10@gmail.com" },
    { name: "Zaid Al-Habib", email: "zaid.alhabib@example.com" },
    { name: "Maryam Siddiqua", email: "maryam.s@example.com" },
  ];

  const courses = [
    "Mindfulness in Islam",
    "Islamic Psychology Basics",
    "Quran: Understanding Daily Supplication",
    "Arabic for Beginners",
    "Islamic History",
    "Fiqh Essentials",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({
      ...formData,
      id: Date.now(),
      status: "Scheduled",
      students: 0,
    });
    onClose();
    setFormData({
      course: "",
      title: "",
      day: "",
      startTime: "",
      endTime: "",
      zoomLink: "",
      teacher: "",
      teacherEmail: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-greenTeal" />
            </div>
            <h2 className="text-xl font-black text-stone-400 arimo-font">
              Schedule New Live Session
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-50 rounded-xl transition-all text-stone-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar"
        >
          {/* Select Course */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
              <BookOpen className="w-4 h-4 text-stone-400" />
              Select Course <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font appearance-none"
            >
              <option value="">Choose a course...</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Session Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 inter-font">
              Session Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Week 3: Managing Anxiety Through Mindfulness"
              className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
            />
            <p className="text-[10px] text-stone-400 inter-font">
              Give your live session a descriptive title
            </p>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <Calendar className="w-4 h-4 text-stone-400" />
                Select Day <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font appearance-none"
              >
                <option value="">Choose day...</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <Clock className="w-4 h-4 text-stone-400" />
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <Clock className="w-4 h-4 text-stone-400" />
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />
            </div>
          </div>

          {/* Zoom Link */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
              <LinkIcon className="w-4 h-4 text-stone-400" />
              Zoom Meeting Link
            </label>
            <input
              type="url"
              value={formData.zoomLink}
              onChange={(e) =>
                setFormData({ ...formData, zoomLink: e.target.value })
              }
              placeholder="https://zoom.us/j/1234567890"
              className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
            />
            <p className="text-[10px] text-stone-400 inter-font">
              Create a Zoom meeting and paste the link here. Students will use
              this to join.
            </p>
          </div>

          {/* Teacher Info Row */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
              <User className="w-4 h-4 text-stone-400" />
              Select Teacher <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.teacherEmail}
              onChange={(e) => {
                const selectedTeacher = teachers.find(
                  (t) => t.email === e.target.value,
                );
                setFormData({
                  ...formData,
                  teacher: selectedTeacher ? selectedTeacher.name : "",
                  teacherEmail: e.target.value,
                });
              }}
              className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font appearance-none"
            >
              <option value="">Choose a teacher...</option>
              {teachers.map((t) => (
                <option key={t.email} value={t.email}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 py-3 rounded-xl font-bold transition-all inter-font"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-greenTeal hover:bg-teal-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-900/10 active:scale-95 transition-all inter-font"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
