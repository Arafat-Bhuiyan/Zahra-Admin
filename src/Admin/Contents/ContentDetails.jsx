import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Play,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ContentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data for the specific article in the design
  const content = {
    title: "Finding Peace Through Islamic Mindfulness Practices",
    subtitle:
      "Clinical Psychologist & Islamic Scholar specializing in mindfulness-based therapy",
    author: "Dr. Fatima Rahman",
    authorInitial: "D",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    category: "Spiritual Growth",
    heroImage:
      "https://images.unsplash.com/photo-1507502707541-f369a3b18502?q=80&w=2788&auto=format&fit=crop",
    videoTitle: "The Power of Gratitude in Islam",
    videoDuration: "16:55",
    videoThumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2899&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/FXNsrLUksuY?autoplay=1", // A related inspirational video
  };

  return (
    <div className="min-h-screen bg-white pb-20 arimo-font animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/contents")}
        className="flex items-center gap-2 px-4 py-2 text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-base font-normal">Back to Blog</span>
      </button>

      {/* Hero Section */}
      <div className="relative w-full h-[476px] overflow-hidden rounded-t-2xl">
        <img
          src={content.heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Floating Header Card */}
      <div className="max-w-[968px] mx-auto -mt-48 relative z-10 px-4 md:px-0">
        <div className="bg-gradient-to-r from-teal-50 via-white to-slate-50 rounded-2xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] border border-stone-200 p-8 flex flex-col gap-6">
          <h1 className="text-stone-900 text-4xl font-normal leading-tight">
            {content.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-white text-2xl font-normal shadow-inner">
              {content.authorInitial}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-stone-900 text-xl font-normal leading-7">
                  About {content.author}
                </h3>
                <p className="text-stone-700 text-base font-normal leading-6">
                  {content.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-stone-600">
                  <User className="w-5 h-5" />
                  <span className="text-base">{content.author}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-base">{content.date}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-5 h-5" />
                  <span className="text-base">{content.readTime}</span>
                </div>
              </div>

              <div className="inline-flex px-4 py-1.5 bg-teal-50 rounded-2xl border border-slate-300 text-slate-600 text-xs font-normal">
                {content.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[932px] mx-auto mt-14 px-4 md:px-0 space-y-8">
        <div className="space-y-6 text-stone-700 text-base leading-relaxed">
          <p>
            In our fast-paced modern world, finding moments of peace and
            tranquility can seem like an impossible task. However, Islamic
            tradition offers us a wealth of mindfulness practices that have been
            used for centuries to cultivate inner peace and spiritual awareness.
          </p>
          <p>
            Dhikr (remembrance of Allah) is perhaps the most fundamental
            mindfulness practice in Islam. When we engage in dhikr with presence
            and intention, we create a state of mindful awareness that anchors
            us in the present moment. The Prophet Muhammad (peace be upon him)
            said, "The similitude of the one who remembers his Lord and the one
            who does not is like that of the living and the dead."
          </p>
          <p>
            Research in modern psychology has shown that mindfulness practices
            can significantly reduce anxiety and stress. When we combine this
            scientific understanding with the spiritual depth of Islamic
            practices, we create a powerful tool for mental and spiritual
            wellness.
          </p>
          <p>
            Practical steps for incorporating Islamic mindfulness into your
            daily life include: Setting aside specific times for dhikr,
            practicing mindful prayer (salah) with full presence, taking moments
            throughout the day for reflection (muraqabah), and cultivating
            gratitude (shukr) through conscious awareness of Allah's blessings.
          </p>
          <p>
            The key is consistency and sincerity. Even five minutes of focused
            dhikr can transform your day and create a sense of peace that
            carries through your daily activities. Start small, be patient with
            yourself, and trust in the healing power of remembering Allah.
            <button className="text-cyan-800 underline ml-1 hover:text-cyan-900 transition-colors">
              See more
            </button>
          </p>
        </div>

        {/* Video Section Card */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden mt-14 shadow-sm">
          <div className="bg-white border-b border-stone-200 p-6 flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#7AA4A5] text-xs font-bold uppercase tracking-tight">
                <Play className="w-4 h-4 fill-current" />
                Watch Video
              </div>
              <h2 className="text-stone-900 text-lg font-bold leading-7">
                {content.videoTitle}
              </h2>
            </div>
            {isPlaying && (
              <button
                onClick={() => setIsPlaying(false)}
                className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-500"
                title="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative aspect-video group overflow-hidden bg-black">
            {!isPlaying ? (
              <div
                className="w-full h-full cursor-pointer relative"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={content.videoThumbnail}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="w-10 h-10 text-[#7AA4A5] fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/80 px-3 py-1.5 rounded text-white text-sm font-bold">
                  {content.videoDuration}
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={content.videoUrl}
                title={content.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="bg-white p-4 px-6 border-t border-stone-200 flex justify-between items-center">
            <p className="text-stone-600 text-sm font-normal">
              {isPlaying
                ? "Currently playing video"
                : "Click to play embedded video"}
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-lg text-stone-700 text-sm font-normal hover:bg-stone-50 transition-colors">
              Watch Full Page
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
