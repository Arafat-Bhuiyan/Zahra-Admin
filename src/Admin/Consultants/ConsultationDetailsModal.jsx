import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Clock,
  User,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ConsultationDetailsModal = ({ isOpen, onClose, consultation }) => {
  if (!isOpen || !consultation) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const availableDates = useMemo(() => {
    if (!consultation.timeslots?.length) return [];
    return Array.from(
      new Set(consultation.timeslots.map((slot) => slot.day).filter(Boolean)),
    ).sort((a, b) => new Date(a) - new Date(b));
  }, [consultation.timeslots]);

  const [calendarDate, setCalendarDate] = useState(() => {
    const initial = availableDates[0]
      ? new Date(availableDates[0])
      : new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(
    () => availableDates[0] || null,
  );
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  useEffect(() => {
    if (availableDates.length) {
      setSelectedDate(availableDates[0]);
      const first = new Date(availableDates[0]);
      setCalendarDate(new Date(first.getFullYear(), first.getMonth(), 1));
      setSelectedSlotId(null);
    }
  }, [availableDates]);

  const availableDateSet = useMemo(
    () =>
      new Set(
        availableDates.map(
          (date) => new Date(date).toISOString().split("T")[0],
        ),
      ),
    [availableDates],
  );

  const slotsForSelectedDate = useMemo(
    () =>
      consultation.timeslots?.filter((slot) => slot.day === selectedDate) || [],
    [consultation.timeslots, selectedDate],
  );

  const monthLabel = useMemo(
    () =>
      calendarDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [calendarDate],
  );

  const startDay = calendarDate.getDay();
  const daysInMonth = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1,
    0,
  ).getDate();

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startDay; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day,
      );
      const iso = date.toISOString().split("T")[0];
      cells.push({ day, iso });
    }
    const trailing = (7 - (cells.length % 7)) % 7;
    for (let i = 0; i < trailing; i += 1) {
      cells.push(null);
    }
    return cells;
  }, [calendarDate, daysInMonth, startDay]);

  const previousMonth = () =>
    setCalendarDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setCalendarDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-stone-50 rounded-[2rem] shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="px-6 py-5 md:px-8 md:py-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 arimo-font">
              Consultation with{" "}
              {`${consultation.teacher?.user?.first_name || ""} ${consultation.teacher?.user?.last_name || ""}`.trim() ||
                "Teacher"}
            </h2>
            <p className="text-stone-500 text-sm inter-font">
              Review schedule and consultation details
            </p>
          </div>
          <button
            onClick={onClose}
            className="self-start p-2 hover:bg-stone-200/50 rounded-xl transition-all text-stone-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-8 md:px-8 flex flex-col gap-8 lg:flex-row">
          {/* Left Column: Teacher & Slots */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center border-2 border-stone-50 overflow-hidden shrink-0">
                <User className="w-8 h-8 text-stone-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-900 inter-font">
                  {`${consultation.teacher?.user?.first_name || ""} ${consultation.teacher?.user?.last_name || ""}`.trim() ||
                    "Teacher"}
                </h3>
                <p className="text-xs text-stone-500 font-medium inter-font">
                  {consultation.teacher?.professional_title || "Professional"}
                </p>
              </div>
              <div className="text-stone-900 font-bold text-lg">
                ${consultation.teacher?.consultation_rate ?? "N/A"}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-sm font-bold text-stone-600 inter-font">
                  Available Time Slots
                </h4>
                <span className="text-xs text-stone-500 inter-font">
                  {selectedDate ? formatDate(selectedDate) : "Select a date"}
                </span>
              </div>
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-2 no-scrollbar">
                {slotsForSelectedDate.length > 0 ? (
                  slotsForSelectedDate.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`w-full text-left bg-white border rounded-xl p-3 flex items-center gap-3 transition-all shadow-sm ${
                        selectedSlotId === slot.id
                          ? "border-teal-500 bg-teal-50"
                          : "border-stone-200 hover:border-teal-500"
                      }`}
                    >
                      <Clock className="w-4 h-4 text-stone-400" />
                      <span className="text-sm font-medium text-stone-800 inter-font">
                        {formatTime(slot.start_time)} -{" "}
                        {formatTime(slot.end_time)}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="bg-white border border-stone-200 rounded-xl p-3 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-medium text-stone-800 inter-font">
                      No available time slots for this date
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Calendar */}
          <div className="w-full lg:w-[320px] space-y-4">
            <h4 className="text-sm font-bold text-stone-600 inter-font">
              Select Date
            </h4>
            <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-stone-800">
                  {monthLabel}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="p-1 hover:bg-stone-100 rounded-md"
                  >
                    <ChevronLeft className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1 hover:bg-stone-100 rounded-md"
                  >
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div
                    key={d}
                    className="text-[10px] font-bold text-stone-400 text-center"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((cell, index) => {
                  if (!cell) {
                    return (
                      <div key={index} className="aspect-square rounded-lg" />
                    );
                  }

                  const isAvailable = availableDateSet.has(cell.iso);
                  const isSelected = selectedDate === cell.iso;

                  return (
                    <button
                      key={cell.iso}
                      type="button"
                      onClick={() => isAvailable && setSelectedDate(cell.iso)}
                      className={`aspect-square rounded-lg text-xs font-semibold transition-all ${
                        isAvailable
                          ? isSelected
                            ? "bg-teal-600 text-white shadow-md shadow-teal-900/10"
                            : "text-stone-700 hover:bg-teal-50 hover:text-teal-700"
                          : "text-stone-300 cursor-not-allowed"
                      } flex items-center justify-center ${isAvailable ? "cursor-pointer" : ""}`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {consultation.bundleSessions && (
          <div className="px-6 pb-8 md:px-8">
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
      </div>
    </div>
  );
};

export default ConsultationDetailsModal;
