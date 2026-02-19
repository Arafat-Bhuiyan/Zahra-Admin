import React from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Package,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const ConsultationDetailsModal = ({ isOpen, onClose, consultation }) => {
  if (!isOpen || !consultation) return null;

  // Mock calendar days for demonstration
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [
    { day: 28, current: false },
    { day: 29, current: false },
    { day: 30, current: false },
    { day: 31, current: false },
    { day: 1, current: true, selected: true },
    { day: 2, current: true },
    { day: 3, current: true },
    { day: 4, current: true },
    { day: 5, current: true },
    { day: 6, current: true },
    { day: 7, current: true },
    { day: 8, current: true },
    { day: 9, current: true },
    { day: 10, current: true },
    { day: 11, current: true },
    { day: 12, current: true },
    { day: 13, current: true },
    { day: 14, current: true },
    { day: 15, current: true },
    { day: 16, current: true },
    { day: 17, current: true },
    { day: 18, current: true },
    { day: 19, current: true },
    { day: 20, current: true },
    { day: 21, current: true },
    { day: 22, current: true },
    { day: 23, current: true },
    { day: 24, current: true },
    { day: 25, current: true },
    { day: 26, current: true },
    { day: 27, current: true },
    { day: 28, current: true },
    { day: 29, current: true },
    { day: 30, current: true },
    { day: 31, current: true },
  ];

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-stone-50 rounded-[2rem] shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="px-8 py-6 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 arimo-font">
              Consultation with {consultation.instructor}
            </h2>
            <p className="text-stone-500 text-sm inter-font">
              Review schedule and consultation details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-200/50 rounded-xl transition-all text-stone-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-8 pb-8 flex flex-col md:flex-row gap-8">
          {/* Left Column: Teacher & Slots */}
          <div className="flex-1 space-y-6">
            {/* Teacher Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center border-2 border-stone-50 overflow-hidden shrink-0">
                <User className="w-8 h-8 text-stone-400" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 inter-font">
                  {consultation.instructor}
                </h3>
                <p className="text-xs text-stone-500 font-medium inter-font">
                  Clinical Psychologist
                </p>
              </div>
              <div className="ml-auto text-stone-900 font-bold text-lg">
                $50
              </div>
            </div>

            {/* Slots List */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-600 inter-font">
                Available Time Slots
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 no-scrollbar">
                {consultation.slots?.map((slot, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-xl p-3 flex items-center gap-3 hover:border-teal-500 transition-all cursor-pointer group shadow-sm"
                  >
                    <Clock className="w-4 h-4 text-stone-400 group-hover:text-teal-500" />
                    <span className="text-sm font-medium text-stone-800 inter-font">
                      {slot.date} at {slot.startTime}
                    </span>
                  </div>
                )) || (
                  <div className="bg-white border border-stone-200 rounded-xl p-3 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-medium text-stone-800 inter-font">
                      {consultation.date} at {consultation.time}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Calendar */}
          <div className="w-full md:w-[280px] space-y-4">
            <h4 className="text-sm font-bold text-stone-600 inter-font">
              Select Date
            </h4>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-stone-800">
                  January 2026
                </span>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-stone-100 rounded-md">
                    <ChevronLeft className="w-4 h-4 text-stone-400" />
                  </button>
                  <button className="p-1 hover:bg-stone-100 rounded-md">
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((d) => (
                  <div
                    key={d}
                    className="text-[10px] font-bold text-stone-400 text-center"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {dates.map((d, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all
                           ${!d.current ? "text-stone-300" : "text-stone-700 hover:bg-teal-50 hover:text-teal-700 cursor-pointer"}
                           ${d.selected ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-900/10" : ""}
                        `}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Banner */}
        {consultation.bundleSessions && (
          <div className="px-8 mb-8">
            <div className="relative bg-white rounded-3xl border-2 border-amber-600 shadow-xl p-6 flex flex-col items-center text-center group">
              <div className="absolute -top-4 bg-amber-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg transform transition-transform group-hover:scale-110">
                Best Value
              </div>
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-amber-100 mb-4 shadow-inner">
                <Package className="w-8 h-8 text-amber-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-stone-900 arimo-font tracking-tight">
                  Complete Bundle
                </h3>
                <p className="text-sm font-bold text-stone-500 inter-font uppercase tracking-widest">
                  {consultation.bundleSessions} sessions included
                </p>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-4xl font-black text-amber-600 arimo-font tracking-tighter">
                  $
                  {(
                    50 *
                    consultation.bundleSessions *
                    (1 - consultation.discount / 100)
                  ).toFixed(0)}
                </span>
                <span className="text-lg font-bold text-stone-300 line-through decoration-amber-200/50">
                  ${50 * consultation.bundleSessions}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-8 py-6 border-t border-stone-200 bg-white/50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-stone-200 text-stone-600 py-3.5 rounded-2xl font-bold hover:bg-stone-50 transition-all inter-font shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-teal-600 text-white py-3.5 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/20 active:scale-95 inter-font flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailsModal;
