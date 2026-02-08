import React, { useState } from "react";
import {
  X,
  Video,
  Calendar,
  Clock,
  User,
  Mail,
  Link as LinkIcon,
  Plus,
  Package,
  DollarSign,
} from "lucide-react";

const ScheduleConsultationModal = ({ isOpen, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    teacher: "",
    teacherEmail: "",
    day: "",
    startTime: "",
    endTime: "",
    zoomLink: "",
    isBundle: false,
    bundleSessions: "",
    originalPrice: "",
    discount: "",
  });

  const [slots, setSlots] = useState([]);

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

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  if (!isOpen) return null;

  const handleAddSlot = () => {
    const newSlot = {
      id: Date.now(),
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      zoomLink: formData.zoomLink,
    };

    setSlots([...slots, newSlot]);
    // Reset slot fields
    setFormData({
      ...formData,
      day: "",
      startTime: "",
      endTime: "",
      zoomLink: "",
    });
  };

  const removeSlot = (id) => {
    setSlots(slots.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (slots.length === 0 && (!formData.day || !formData.startTime)) {
      alert("Please add at least one slot");
      return;
    }

    const finalSlots =
      slots.length > 0
        ? slots
        : [
            {
              id: Date.now(),
              day: formData.day,
              startTime: formData.startTime,
              endTime: formData.endTime,
              zoomLink: formData.zoomLink,
            },
          ];

    onSchedule({
      ...formData,
      id: Date.now(),
      status: "Scheduled",
      students: 28, // Demo default
      slots: finalSlots,
    });
    onClose();
    resetForm();
    setSlots([]);
  };

  const resetForm = () => {
    setFormData({
      teacher: "",
      teacherEmail: "",
      day: "",
      startTime: "",
      endTime: "",
      zoomLink: "",
      isBundle: false,
      bundleSessions: "",
      originalPrice: "",
      discount: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-stone-200/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-greenTeal" />
            </div>
            <h2 className="text-xl font-black text-stone-900 arimo-font">
              Schedule New Consultation
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

          {/* Slots List */}
          {slots.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest inter-font">
                Added Slots ({slots.length})
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between bg-teal-50/50 p-4 rounded-xl border border-teal-100"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-teal-700 inter-font">
                        {slot.day}
                      </span>
                      <span className="text-sm text-stone-500 inter-font">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSlot(slot.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slot Header */}
          <button
            type="button"
            onClick={handleAddSlot}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white p-1 rounded-2xl transition-all active:scale-95 group"
          >
            <span className="text-sm font-bold text-white arimo-font flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Create Slot
            </span>
          </button>

          {/* Slot Details Box */}
          <div className="p-6 bg-teal-50/20 rounded-2xl border-2 border-teal-500/30 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 inter-font">
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
                <label className="text-sm font-bold text-stone-700 inter-font">
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
                <label className="text-sm font-bold text-stone-700 inter-font">
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

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <Video className="w-4 h-4 text-stone-400" />
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
          </div>

          {/* Bundle Section */}
          <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-600/20 space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-bold text-stone-800 arimo-font">
                Do you want to create a bundle?
              </h4>
            </div>

            <div className="flex flex-col gap-6 py-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 inter-font">
                  Number of Sessions <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.bundleSessions}
                  onChange={(e) =>
                    setFormData({ ...formData, bundleSessions: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium text-stone-800 inter-font"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 inter-font">
                    Original Bundle Price ($){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium text-stone-800 inter-font"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 inter-font">
                    Discount (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium text-stone-800 inter-font"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 p-3 rounded-xl border border-amber-600/10">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider uppercase">
                    Final Bundle Value
                  </span>
                  <span className="text-lg font-black text-stone-800 arimo-font">
                    $
                    {formData.originalPrice && formData.discount
                      ? (
                          formData.originalPrice -
                          (formData.originalPrice * formData.discount) / 100
                        ).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
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
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-900/10 active:scale-95 transition-all inter-font"
            >
              Schedule Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleConsultationModal;
