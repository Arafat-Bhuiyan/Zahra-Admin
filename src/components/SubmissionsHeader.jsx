'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  useGetCoursesDataQuery,
  useGetCourseByIdQuery,
} from '../Api/adminApi';

export default function SubmissionsHeader({
  onTypeChange,
  onSearchChange,
  onCourseChange,
  onModuleChange,
}) {
  const [submissionType, setSubmissionType] = useState('assignment');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');

  const { data: coursesData } = useGetCoursesDataQuery();
  const courses = coursesData?.results ?? coursesData ?? [];

  const { data: courseDetail } = useGetCourseByIdQuery(selectedCourseId, {
    skip: !selectedCourseId,
  });
  const modules = courseDetail?.modules ?? [];

  const handleTypeChange = (type) => {
    setSubmissionType(type);
    onTypeChange?.(type);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleCourseChange = (e) => {
    const id = e.target.value;
    setSelectedCourseId(id);
    setSelectedModuleId('');
    onCourseChange?.(id);
    onModuleChange?.('');
  };

  const handleModuleChange = (e) => {
    const id = e.target.value;
    setSelectedModuleId(id);
    onModuleChange?.(id);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="More filters">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>

        {/* Course Dropdown */}
        <select
          value={selectedCourseId}
          onChange={handleCourseChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        {/* Module Dropdown — only shown when a course is selected */}
        {selectedCourseId && (
          <select
            value={selectedModuleId}
            onChange={handleModuleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
          >
            <option value="">All Modules</option>
            {modules.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.title}
              </option>
            ))}
          </select>
        )}

        {/* Assignment / Quiz Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleTypeChange('assignment')}
            className={`px-4 py-1 rounded text-sm font-medium transition-all ${
              submissionType === 'assignment'
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Assignment
          </button>
          <button
            onClick={() => handleTypeChange('quiz')}
            className={`px-4 py-1 rounded text-sm font-medium transition-all ${
              submissionType === 'quiz'
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
