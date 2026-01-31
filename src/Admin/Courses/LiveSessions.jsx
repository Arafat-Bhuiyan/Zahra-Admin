import React, { useState } from "react";
import {
  ChevronLeft,
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  Plus,
  Search,
  MoreVertical,
  User,
  Mail,
} from "lucide-react";

import ScheduleSessionModal from "./ScheduleSessionModal";
import ScheduleConsultationModal from "./ScheduleConsultationModal";
import ConsultationDetailsModal from "./ConsultationDetailsModal";

const LiveSessions = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("Schedule live Class");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Islamic Family Counseling",
      instructor: "Fatima Ara",
      email: "fatimaara10@gmail.com",
      date: "Today",
      time: "2:00 PM",
      students: 28,
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Islamic Family Counseling",
      instructor: "Fatima Ara",
      email: "fatimaara10@gmail.com",
      date: "Today",
      time: "2:00 PM",
      students: 28,
      status: "Scheduled",
    },
  ]);
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

  const handleAddSession = (newSession) => {
    const formattedSession = {
      id: newSession.id,
      title: newSession.title,
      instructor: newSession.teacher,
      email: newSession.teacherEmail,
      date: newSession.date,
      time: newSession.startTime,
      students: 0,
      status: "Scheduled",
    };
    setSessions((prev) => [formattedSession, ...prev]);
  };

  const handleAddConsultation = (newConsultation) => {
    const formattedConsultation = {
      id: newConsultation.id,
      title: "Private Consultation",
      instructor: newConsultation.teacher,
      email: newConsultation.teacherEmail,
      date: newConsultation.date,
      time: newConsultation.startTime,
      students: 1,
      status: "Scheduled",
    };
    setConsultations((prev) => [formattedConsultation, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 pb-20">
      {/* Top Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 font-medium hover:text-teal-700 transition-colors w-fit group"
      >
        <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </div>
        <span className="arimo-font">Back to Courses</span>
      </button>

      {/* Header section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-greenTeal tracking-tight arimo-font">
          Live Sessions
        </h1>
        <p className="text-stone-500 font-medium tracking-wide inter-font">
          Manage your live teaching sessions
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="w-full bg-stone-100/80 p-1.5 rounded-full inline-flex justify-between border border-stone-200/50">
        {["Schedule live Class", "Schedule New Consultation"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full px-8 py-2.5 rounded-full text-sm font-bold transition-all inter-font ${
              activeTab === tab
                ? "bg-white text-stone-800 shadow-sm border border-stone-200/50"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sessions Container */}
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-stone-400 font-bold uppercase tracking-widest text-xs inter-font">
            Upcoming Sessions
          </h2>
          <button
            onClick={() =>
              activeTab === "Schedule live Class"
                ? setIsModalOpen(true)
                : setIsConsultationModalOpen(true)
            }
            className="flex items-center gap-2 bg-greenTeal hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-teal-900/10 inter-font"
          >
            <Video className="w-4 h-4" />
            <span>{activeTab}</span>
          </button>
        </div>

        {activeTab === "Schedule live Class" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <React.Fragment key={session.id}>
                {/* Left Card: Instructor Info */}
                <div className="bg-stone-50/50 border-l-4 border-greenTeal rounded-2xl p-6 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                    <Video className="w-6 h-6 text-greenTeal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-stone-900 inter-font group-hover:text-teal-700 transition-colors">
                      {session.instructor}
                    </h3>
                    <p className="text-sm font-medium text-stone-400 inter-font">
                      {session.email}
                    </p>
                  </div>
                </div>

                {/* Right Card: Session Details */}
                <div className="bg-stone-50/50 border-l-4 border-greenTeal rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                      <Video className="w-6 h-6 text-greenTeal" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-stone-900 inter-font group-hover:text-teal-700 transition-colors">
                        {session.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="inter-font">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="inter-font">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                          <Users className="w-3.5 h-3.5" />
                          <span className="inter-font">
                            {session.students} students
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="px-3 py-1 bg-stone-100 text-stone-500 rounded-lg text-xs font-bold uppercase tracking-wider border border-stone-200 inter-font">
                      {session.status}
                    </span>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-greenTeal hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 inter-font">
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Session</span>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {consultations.map((consultation) => (
              <React.Fragment key={consultation.id}>
                <div className="bg-stone-50/50 border-l-4 border-amber-500 rounded-2xl p-6 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                    <User className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-stone-900 inter-font group-hover:text-amber-700 transition-colors">
                      {consultation.instructor}
                    </h3>
                    <div className="flex items-center gap-6 mt-1">
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
                    className="bg-white border border-stone-200 text-stone-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <ScheduleSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSchedule={handleAddSession}
      />

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

export default LiveSessions;
