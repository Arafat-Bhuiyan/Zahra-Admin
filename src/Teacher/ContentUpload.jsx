import { useState } from 'react';
import { Eye, X, Play, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContentUpload() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-content');
  const [selectedContent, setSelectedContent] = useState(null); // Declare selectedContent variable

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: null,
    tags: [],
    readTime: '',
    publishDate: '',
    category: ''
  });

  const contentCards = [
    {
      id: 1,
      title: 'Building Healthy Relationships Through Islamic Values',
      description: 'Learn how Islamic principles can strengthen your family bonds and improve communication.',
      author: 'Dr. Sarah Ahmed',
      category: 'Relationships',
      date: 'Dec 22, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
      status: 'Approved',
      statusColor: 'bg-teal-100 text-teal-700'
    },
    {
      id: 2,
      title: 'Healing Trauma with Faith and Professional Support',
      description: 'Combining Islamic spiritual practices with evidence-based therapeutic approaches for trauma healing.',
      author: 'Dr. Ahmed Yousef',
      category: 'Mental Health',
      date: 'Dec 28, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1544367567-0d393fcb7f70?w=400&h=300&fit=crop',
      status: 'Pending',
      statusColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: 3,
      title: 'Finding Peace Through Islamic Mindfulness Practices',
      description: 'Discover mindfulness techniques rooted in Islamic tradition for mental well-being.',
      author: 'Dr. Fatima Rahman',
      category: 'Wellness',
      date: 'Dec 20, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
      status: 'Approved',
      statusColor: 'bg-teal-100 text-teal-700'
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, coverImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    const newTag = document.getElementById('tag-input')?.value;
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      document.getElementById('tag-input').value = '';
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handlePublish = () => {
    console.log('Publishing content:', formData);
    alert('Content published successfully!');
    setFormData({ title: '', excerpt: '', content: '', coverImage: null, tags: [], readTime: '', publishDate: '', category: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
  

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleTabChange('my-content')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'my-content'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            My Content
          </button>
          <button
            onClick={() => handleTabChange('upload')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'upload'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            Upload New Content
          </button>
        </div>

        {/* My Content Tab */}
        {activeTab === 'my-content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentCards.map(card => (
              <div key={card.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded text-xs font-medium text-gray-700">
                    {card.date} • {card.readTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-teal-600 uppercase">{card.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{card.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-teal-600">DR</span>
                    </div>
                    <span className="text-sm text-gray-700">{card.author}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/teacher/content-details/${card.id}`, { state: { content: card } })}
                      className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${card.statusColor}`}>
                      {card.status}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Content Tab */}
        {activeTab === 'upload' && (
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="col-span-2 space-y-6">
              {/* Cover Image */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Image</h3>
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-colors">
                  {formData.coverImage ? (
                    <img src={formData.coverImage || "/placeholder.svg"} alt="Cover" className="max-h-40 mx-auto rounded" />
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload cover image</p>
                      <p className="text-xs text-gray-500">Recommended: 1200x400px</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Blog Title */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a compelling blog title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Excerpt */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a short summary (this will appear in blog previews)"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Blog Content */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here..."
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {/* Additional Media */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Media</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Add Image</p>
                  </button>
                  <button className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 hover:bg-teal-50 transition-colors">
                    <Play className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Add Video</p>
                  </button>
                </div>
              </div>

              {/* Publish Button */}
              <div className="flex justify-end">
                <button
                  onClick={handlePublish}
                  className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Publish
                </button>
              </div>
            </div>

            {/* Right Column - Options */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                    <input
                      type="date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="tag-input"
                        placeholder="Add a tag"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span key={tag} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="hover:text-teal-900">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Information */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    FA
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dr. Fatima Aba</p>
                    <p className="text-sm text-gray-600">Content Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
