'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function GradeAssignmentModal({ submission, onClose, totalPoints = 50 }) {
  const [score, setScore] = useState(submission?.currentScore || 0);
  const [feedback, setFeedback] = useState('');

  const percentage = Math.round((score / totalPoints) * 100);

  const handleSaveGrade = () => {
    console.log('[v0] Saving grade:', { score, feedback, percentage });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-teal-500 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Grade Assignment</h2>
            <p className="text-teal-100 text-sm mt-1">Build a Custom Hook</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-teal-600 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-600 font-semibold text-sm">
                {submission?.studentName
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{submission?.studentName}</p>
              <p className="text-sm text-gray-500">{submission?.studentEmail}</p>
            </div>
          </div>

          {/* Score Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Score <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={totalPoints}
                  value={score}
                  onChange={(e) => setScore(Math.min(parseInt(e.target.value) || 0, totalPoints))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-gray-900"
                />
                <span className="text-sm text-gray-600">/ {totalPoints} points</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-600">{percentage}%</p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed feedback to help the student improve..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-2">
              Be specific and constructive in your feedback
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGrade}
            className="flex-1 px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>✓</span>
            Save Grade
          </button>
        </div>
      </div>
    </div>
  );
}
