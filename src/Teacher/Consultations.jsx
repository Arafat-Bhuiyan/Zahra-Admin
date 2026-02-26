'use client';

import { useState } from 'react';
import { Calendar, Clock, DollarSign, MessageSquare, X } from 'lucide-react';
import RescheduleModal from '../components/Modal/RescheduleModal';

export default function Consultations() {
  const [activeTab, setActiveTab] = useState('booked');
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  const bookedSessions = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      date: 'Jan 9, 2026',
      time: '09:00 - 09:30AM',
      status: 'Confirmed',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      date: 'Jan 11, 2026',
      time: '09:00 - 09:30AM',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 3,
      studentName: 'Aisha Mohammed',
      date: 'Jan 12, 2026',
      time: '09:00 - 09:30AM',
      status: 'Confirmed',
      statusColor: 'bg-green-100 text-green-700'
    }
  ];

  const availabilitySlots = [
    { id: 1, date: '05 January', day: 'Monday', time: '09:00 - 09:30' },
    { id: 2, date: '07 January', day: 'Wednesday', time: '09:00 - 09:30' },
    { id: 3, date: '10 January', day: 'Monday', time: '09:00 - 09:30' },
    { id: 4, date: '15 January', day: 'Wednesday', time: '09:00 - 09:30' }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
     

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Booked Sessions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Hourly Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">$35</p>
              <p className="text-xs text-gray-500 mt-2">Set by admin</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('booked')}
            className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
              activeTab === 'booked'
                ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Booked Sessions
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
              activeTab === 'availability'
                ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Availability
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'booked' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Consultations</h3>
              <div className="space-y-4">
                {bookedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-200 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{session.studentName}</h4>
                        <p className="text-sm text-gray-600">
                          {session.date} • {session.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${session.statusColor}`}>
                        {session.status}
                      </span>

                      {session.status === 'Confirmed' && (
                        <>
                          <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4" />
                            Join Session
                          </button>
                        </>
                      )}

                      {session.status === 'Pending' && (
                        <>
                          <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                            Confirm
                          </button>
                        </>
                      )}

                      <button className="px-3 py-1.5 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Availability</h3>
              <div className="space-y-4">
                {availabilitySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-200 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {slot.day}
                        </h4>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setRescheduleOpen(true)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                    >
                      Reschedule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleOpen && <RescheduleModal onClose={() => setRescheduleOpen(false)} />}
    </div>
  );
}
