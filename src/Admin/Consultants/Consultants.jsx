import React, { useState } from "react";
import { User, Mail, Calendar, Video, Plus } from "lucide-react";
import ScheduleConsultationModal from "./ScheduleConsultationModal";
import ConsultationDetailsModal from "./ConsultationDetailsModal";
import { useGetConsultationsQuery } from "../../Api/adminApi";

const Consultants = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const {
    data: consultationsData,
    isLoading,
    isError,
  } = useGetConsultationsQuery();
  const consultations = consultationsData?.results || [];

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

  const handleAddConsultation = (newConsultation) => {
    // Since the mutation invalidates tags, the query will refetch automatically
    // No need to manually update local state
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 pb-20 p-6 md:p-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <button
          onClick={() => setIsConsultationModalOpen(true)}
          className="flex items-center gap-2 bg-greenTeal hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-teal-900/10 inter-font w-fit"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Consultation</span>
        </button>
      </div>

      {/* Consultations Container */}
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-stone-400 font-bold uppercase tracking-widest text-xs inter-font">
            Upcoming Consultations
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border-2 border-dashed border-stone-200">
                <Calendar className="w-10 h-10 text-stone-300 animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Loading consultations...
                </h3>
              </div>
            </div>
          ) : isError ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border-2 border-dashed border-stone-200">
                <Calendar className="w-10 h-10 text-stone-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Failed to load consultations
                </h3>
                <p className="text-stone-500">Please try again later.</p>
              </div>
            </div>
          ) : consultations.length > 0 ? (
            consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="bg-stone-50/50 border-l-4 border-amber-500 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 shrink-0">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-stone-900 inter-font group-hover:text-amber-700 transition-colors">
                    {consultation.teacher?.user?.first_name +
                      " " +
                      consultation.teacher?.user?.last_name || "N/A"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                    <p className="text-sm font-medium text-stone-400 inter-font flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      {consultation.teacher?.user?.email || "N/A"}
                    </p>
                    <p className="text-sm font-medium text-amber-600 inter-font flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {consultation.timeslots?.length > 0
                        ? `${formatDate(consultation.timeslots[0].day)} at ${formatTime(consultation.timeslots[0].start_time)} - ${formatTime(consultation.timeslots[consultation.timeslots.length - 1].end_time)}`
                        : "No timeslots"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedConsultation(consultation);
                    setIsDetailsModalOpen(true);
                  }}
                  className="bg-white border border-stone-200 text-stone-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all shadow-sm w-fit"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border-2 border-dashed border-stone-200">
                <Calendar className="w-10 h-10 text-stone-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  No consultations scheduled
                </h3>
                <p className="text-stone-500">
                  Scheduled consultations will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ScheduleConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onSchedule={handleAddConsultation}
      />

      <ConsultationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        consultation={selectedConsultation}
      />
    </div>
  );
};

export default Consultants;
