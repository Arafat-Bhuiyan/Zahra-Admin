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
} from "lucide-react";

const ScheduleConsultationModal = ({ isOpen, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    teacher: "",
    teacherEmail: "",
    date: "",
    startTime: "",
    endTime: "",
    zoomLink: "",
    isBundle: false,
    bundleSessions: "",
    discount: "",
  });

  const [slots, setSlots] = useState([]);

  if (!isOpen) return null;

  const handleAddSlot = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) return;

    const newSlot = {
      id: Date.now(),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      zoomLink: formData.zoomLink,
    };

    setSlots([...slots, newSlot]);
    // Reset slot fields
    setFormData({
      ...formData,
      date: "",
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
    if (slots.length === 0 && (!formData.date || !formData.startTime)) {
      alert("Please add at least one slot");
      return;
    }

    const finalSlots =
      slots.length > 0
        ? slots
        : [
            {
              id: Date.now(),
              date: formData.date,
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
      date: "",
      startTime: "",
      endTime: "",
      zoomLink: "",
      isBundle: false,
      bundleSessions: "",
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
          {/* Teacher Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <User className="w-4 h-4 text-stone-400" />
                Select Teacher <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.teacher}
                onChange={(e) =>
                  setFormData({ ...formData, teacher: e.target.value })
                }
                placeholder="Enter teacher name"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-700 inter-font">
                <Mail className="w-4 h-4 text-stone-400" />
                Teacher's email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.teacherEmail}
                onChange={(e) =>
                  setFormData({ ...formData, teacherEmail: e.target.value })
                }
                placeholder="teacher@example.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
              />
            </div>
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
                        {slot.date}
                      </span>
                      <span className="text-sm text-stone-500 inter-font">
                        {slot.startTime} - {slot.endTime}
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
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-stone-100/50 border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-stone-800 inter-font"
                />
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

            <div className="flex items-center justify-between gap-8 py-2">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-stone-700 inter-font">
                  Session <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.bundleSessions}
                  onChange={(e) =>
                    setFormData({ ...formData, bundleSessions: e.target.value })
                  }
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-amber-500 transition-all font-medium text-stone-800 inter-font"
                />
              </div>

              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border-4 border-amber-600 shadow-sm shrink-0">
                <Package className="w-10 h-10 text-amber-600" />
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-stone-700 inter-font text-right block">
                  Discount % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-amber-500 transition-all font-medium text-stone-800 inter-font text-right"
                />
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
