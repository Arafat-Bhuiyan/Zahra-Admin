'use client';

import { Video, Calendar, Clock, Link as LinkIcon, Play } from 'lucide-react';

export default function LiveSessions() {
  const upcomingSessions = [
    {
      id: 1,
      title: 'Module 3: Understanding Anxiety',
      date: 'Tomorrow',
      time: '10:00 AM - 11:30 AM',
      platform: 'Google Meet',
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Module 1: Islamic Family Counseling',
      date: '15/01/2026',
      time: '10:00 AM - 11:30 AM',
      platform: 'Google Meet',
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'Module 1: Family Counseling',
      date: '16/01/2026',
      time: '10:00 AM - 11:30 AM',
      platform: 'Google Meet',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-teal-500 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-teal-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h1>
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-8 py-8">
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white border-l-4 border-teal-600 rounded-lg p-6 flex items-start justify-between hover:shadow-md transition-shadow"
            >
              {/* Left Content */}
              <div className="flex gap-4 flex-1">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-teal-600" />
                  </div>
                </div>

                {/* Session Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{session.title}</h3>

                  <div className="space-y-2">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{session.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{session.time}</span>
                    </div>

                    {/* Platform */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <LinkIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-teal-600 font-medium hover:underline cursor-pointer">
                        {session.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded">
                  {session.status}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {upcomingSessions.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming sessions scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
