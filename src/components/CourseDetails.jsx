'use client';

import { useState } from 'react';
import { ChevronDown, Share2, Heart, MessageCircle, Eye, Play } from 'lucide-react';

export default function CourseDetails({ course, onBackClick }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const courseData = {
    title: 'Mindfulness in Islam',
    instructor: 'Dr. Ahmed Hassan',
    price: '$99',
    rating: 4.8,
    reviews: 120,
    shares: 6,
    description: 'Explore comprehensive course content for students learning about mindfulness practices within Islamic tradition.',
    builder: 'Course Builder',
    builderDesc: 'Create comprehensive course content for students',
    image: '/images/image.png',
    thumbnail: '/images/image.png',
  };

  const modules = [
    {
      id: 1,
      title: 'Module 1: Understanding Anxiety',
      lessons: [
        { id: 1, title: 'Introduction to the Course' },
        { id: 2, title: "What's Anxiety?" },
        { id: 3, title: 'Anxiety in Islamic Teaching' },
      ],
    },
    {
      id: 2,
      title: 'Module 2: Dhikr & Mindfulness',
      lessons: [
        { id: 4, title: 'Understanding Dhikr' },
        { id: 5, title: 'Practice Session' },
      ],
    },
    {
      id: 3,
      title: 'Module 3: Cognitive Approaches',
      lessons: [{ id: 6, title: 'Overview' }],
    },
    {
      id: 4,
      title: 'Module 4: Tawheed & Trust',
      lessons: [{ id: 7, title: 'Foundations' }],
    },
    {
      id: 5,
      title: 'Module 5: Building Resilience',
      lessons: [{ id: 8, title: 'Practices' }],
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Fatima Ahmed',
      rating: 5,
      date: 'Jan 15, 2024',
      text: 'Excellent course! The instructor explains complex concepts in a clear and understandable way. The combination of Islamic teachings and mindfulness practices is very effective.',
    },
    {
      id: 2,
      name: 'Omar Hassan',
      rating: 4,
      date: 'Jan 10, 2024',
      text: 'Great content and very informative. Would have appreciated more practical exercises.',
    },
    {
      id: 3,
      name: 'Aisha Williams',
      rating: 5,
      date: 'Jan 5, 2024',
      text: 'This course changed my perspective. Highly recommend it to anyone interested in mindfulness and Islamic traditions.',
    },
  ];

  const students = [
    { name: 'Samira Osman', email: 'samira@email.com', status: 'Active' },
    { name: 'Bilal Khan', email: 'bilal@email.com', status: 'Active' },
    { name: 'Huda Ali', email: 'huda@email.com', status: 'Active' },
    { name: 'Lina Peterson', email: 'lina@email.com', status: 'Active' },
  ];

  const courseOverviewContent = (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Course</h3>
        <p className="text-gray-700 leading-relaxed">
          This comprehensive course is designed to help students understand the integration of Islamic teachings with modern mindfulness practices. Students will explore the foundational concepts of mindfulness as understood within Islamic tradition and practical techniques for emotional healing and personal growth.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
        <ul className="space-y-3">
          {[
            'Core concepts of mindfulness within Islamic framework',
            'Practical mindfulness exercises grounded in Islamic teachings',
            'Techniques for managing anxiety and stress through spirituality',
            'Integration of Dhikr practice with modern therapeutic approaches',
            'Developing emotional resilience and spiritual wellness',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
        <ul className="space-y-2">
          {[
            'Basic understanding of Islamic principles',
            'Open mind and willingness to practice',
            'Commitment to 30 minutes daily practice',
            'Journal for reflection and notes',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700">
              <span className="text-teal-600 mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">240 students</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{student.name}</td>
                  <td className="py-3 px-4 text-gray-700">{student.email}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const curriculumContent = (
    <div className="space-y-2">
      {modules.map((module) => (
        <div key={module.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <h4 className="font-semibold text-gray-900">{module.title}</h4>
            <ChevronDown
              size={20}
              className={`text-gray-600 transition ${
                expandedModules[module.id] ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedModules[module.id] && (
            <div className="border-t border-gray-200 bg-gray-50 py-3">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="px-4 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-100">
                  <Play size={16} className="text-teal-600 flex-shrink-0" />
                  <span>{lesson.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const reviewsContent = (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
        <span className="text-gray-700">4.8 (120 reviews)</span>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-gray-300 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-gray-500 text-sm">{review.date}</span>
          </div>
          <p className="text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );

  const communityContent = (
    <div className="text-center py-12">
      <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600">Community discussions coming soon</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBackClick}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-4"
          >
            ← Back to Courses
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left Column - Video and Info */}
          <div className="col-span-2">
            {/* Video Player */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center">
              <img
                src={courseData.image || "/placeholder.svg"}
                alt="Course"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <button className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 transition">
                  <Play size={32} className="text-white fill-white" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
            <p className="text-gray-600 mb-6">{courseData.description}</p>

            {/* Course Builder Section */}
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">{courseData.builder}</h3>
              <p className="text-gray-600 mb-4">{courseData.builderDesc}</p>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-gray-200 mb-6">
                {[
                  { id: 'overview', label: 'Course Overview' },
                  { id: 'curriculum', label: 'Course Curriculum' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'community', label: 'Community Chat' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                      activeTab === tab.id
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'overview' && courseOverviewContent}
                {activeTab === 'curriculum' && curriculumContent}
                {activeTab === 'reviews' && reviewsContent}
                {activeTab === 'community' && communityContent}
              </div>
            </div>
          </div>

          {/* Right Column - Course Card */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
              <img
                src={courseData.thumbnail}
                alt="Course Thumbnail"
                className="w-full rounded-lg mb-4 aspect-video object-cover"
              />
              <div className="mb-4">
                <p className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded">
                  {course?.status || 'Recorded'}
                </p>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{courseData.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{courseData.price}</p>
              <p className="text-sm text-gray-600 mb-4">Lifetime access</p>

              <div className="flex items-center gap-1 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {courseData.rating} ({courseData.reviews})
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-6">Share this course</p>
              <div className="flex gap-2 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Heart size={18} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Share2 size={18} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Eye size={18} />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <MessageCircle size={18} />
                </button>
              </div>

              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
