import React, { useState } from "react";
import { User, Mail, Calendar, Video, Plus } from "lucide-react";
import ScheduleConsultationModal from "./ScheduleConsultationModal";
import ConsultationDetailsModal from "./ConsultationDetailsModal";

const Consultants = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [consultations, setConsultations] = useState([
    {
      id: 1,
      title: "Islamic Family Counseling",
      instructor: "Dr. Jannat Ara",
      email: "jannatara10@gmail.com",
      date: "Today",
      time: "2:00 PM",
      students: 28,
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Islamic Family Counseling",
      instructor: "Dr. Jannat Ara",
      email: "jannatara10@gmail.com",
      date: "Today",
      time: "2:00 PM",
      students: 28,
      status: "Scheduled",
    },
  ]);

  const handleAddConsultation = (newConsultation) => {
    const formattedConsultation = {
      id: newConsultation.id,
      title: "Private Consultation",
      instructor: newConsultation.teacher,
      email: newConsultation.teacherEmail,
      date: newConsultation.date || newConsultation.day || "Today",
      time: newConsultation.startTime,
      students: 1,
      status: "Scheduled",
      slots: newConsultation.slots,
      bundleSessions: newConsultation.bundleSessions,
      originalPrice: newConsultation.originalPrice,
      discount: newConsultation.discount,
    };
    setConsultations((prev) => [formattedConsultation, ...prev]);
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
          {consultations.length > 0 ? (
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
                    {consultation.instructor}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                    <p className="text-sm font-medium text-stone-400 inter-font flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      {consultation.email}
                    </p>
                    <p className="text-sm font-medium text-amber-600 inter-font flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {consultation.date} at {consultation.time}
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
