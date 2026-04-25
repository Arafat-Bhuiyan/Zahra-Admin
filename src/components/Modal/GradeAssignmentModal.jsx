'use client';

import { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

export default function GradeAssignmentModal({ submission, onClose, onSave, isSaving }) {
  const [mark, setMark] = useState(submission?.mark ?? '');
  const [feedback, setFeedback] = useState(submission?.teacher_feedback || '');
  const [status, setStatus] = useState(submission?.rawStatus === 'approved' ? 'approved' : 'approved');

  const handleSaveGrade = () => {
    onSave?.({ status, mark: mark === '' ? null : parseFloat(mark), teacher_feedback: feedback });
  };

  const initials = submission?.studentName
    ?.split(' ')
    .map((n) => n[0])
    .join('') || '?';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-teal-500 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Grade Assignment</h2>
            <p className="text-teal-100 text-sm mt-1 truncate max-w-xs">{submission?.assignmentTitle}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-teal-600 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-600 font-semibold text-sm">{initials}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{submission?.studentName}</p>
              <p className="text-sm text-gray-500">{submission?.studentEmail}</p>
            </div>
          </div>

          {/* Decision */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Decision <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setStatus('approved')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-medium text-sm transition-colors ${
                  status === 'approved'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'border-gray-300 text-gray-600 hover:bg-green-50'
                }`}
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={() => setStatus('rejected')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border font-medium text-sm transition-colors ${
                  status === 'rejected'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'border-gray-300 text-gray-600 hover:bg-red-50'
                }`}
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>

          {/* Mark */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mark <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-gray-900"
            />
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
            <p className="text-xs text-gray-500 mt-2">Be specific and constructive in your feedback</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGrade}
            disabled={!feedback.trim() || isSaving}
            className="flex-1 px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>✓</span>
            )}
            Save Grade
          </button>
        </div>
      </div>
    </div>
  );
}
