import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContentDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const content = location.state?.content;

    if (!content) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Content not found</h2>
                <button
                    onClick={() => navigate('/teacher/content-upload')}
                    className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Content Upload
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Back to Blog Link */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </button>
            </div>

            {/* Hero Section with Cover Image */}
            <div className="relative h-96 overflow-hidden bg-gray-200">
                <img
                    src={content.image || '/placeholder.svg'}
                    alt={content.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-end p-8">
                    <div className="max-w-4xl w-full">
                        <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        {content.author
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">About {content.author}</p>
                        <p className="text-sm text-gray-600">
                            Clinical Psychologist & Trauma Specialist in mindfulness based therapy
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {content.date} • {content.readTime}
                        </p>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <p className="text-gray-700 leading-relaxed mb-6">{content.description}</p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        In our fast-paced modern world, finding moments of peace and tranquility can seem like an impossible task. However, Islamic tradition offers us a wealth of mindfulness practices that have been used for centuries to cultivate inner peace and spiritual well-being.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Other denominations of Islam is perhaps the most fundamental mindfulness practice in Islam. When we engage in prayer with true present moment, we experience a state of undivided attention. This practice strengthens our connection with the Divine and helps us navigate life's challenges with greater clarity and peace of mind.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Practical ideas for incorporating Islamic mindfulness into your daily life include: Setting aside specific times for dhikr, practicing gratitude throughout the day, incorporating Quranic recitation into your routine, and creating a dedicated space for spiritual practice. Even small moments of mindfulness can have powerful effects.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-8">
                        This key is consistently and sincerely. Even five minutes of focused dhikr can transform your day and create a sense of peace that carries through your life and creates a feeling of peace that carries through your life and opens in our current world through your day, step of these deeply meditative activities.
                    </p>

                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                        see more
                    </a>
                </div>

                {/* Video Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.videoTitle || 'The Power of Gratitude in Islam'}</h3>
                    <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                            src={content.videoThumbnail || '/placeholder.svg'}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-8 border-l-teal-600 border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"></div>
                            </div>
                        </div>
                        <p className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                            Watch Full Page
                        </p>
                    </div>
                </div>

                {/* Related Content */}
                <div className="mt-12 pt-12 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Content</h3>
                    <p className="text-gray-600">More resources on Islamic mindfulness and spiritual practices coming soon...</p>
                </div>
            </div>
        </div>
    );
}
