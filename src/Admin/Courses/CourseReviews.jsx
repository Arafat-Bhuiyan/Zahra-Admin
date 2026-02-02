import React from "react";
import { Star } from "lucide-react";

const CourseReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Fatima Ahmed",
      rating: 5,
      date: "Jan 2024",
      comment:
        "This course completely changed my perspective on managing anxiety. The combination of Islamic teachings and modern psychology is brilliant. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?u=fatima",
    },
    {
      id: 2,
      name: "Omar Hassan",
      rating: 5,
      date: "Jan 2024",
      comment:
        "MashAllah, an excellent course. Dr. Sarah explains complex concepts in such an accessible way. The practical exercises have been life-changing.",
      avatar: "https://i.pravatar.cc/150?u=omar",
    },
    {
      id: 3,
      name: "Aisha Ibrahim",
      rating: 5,
      date: "Dec 2023",
      comment:
        "I appreciated the balance between spiritual and scientific approaches. The dhikr practices have become part of my daily routine now.",
      avatar: "https://i.pravatar.cc/150?u=aisha",
    },
    {
      id: 4,
      name: "Yusuf Ali",
      rating: 4,
      date: "Dec 2023",
      comment:
        "Very informative and well-structured. Some lessons could be a bit shorter, but overall excellent content.",
      avatar: "https://i.pravatar.cc/150?u=yusuf",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? "fill-amber-400 text-amber-400" : "text-stone-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1120px] bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-greenTeal arimo-font">
          Student Reviews
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-lg font-black text-stone-900 arimo-font">
              4.7
            </span>
          </div>
          <span className="text-sm font-medium text-stone-400 inter-font">
            (245 reviews)
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-stone-50/50 rounded-2xl border border-stone-100 hover:border-teal-200 hover:bg-white hover:shadow-md transition-all group"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-stone-900 arimo-font group-hover:text-teal-700 transition-colors">
                      {review.name}
                    </h4>
                    <div className="mt-1">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-stone-400 inter-font">
                    {review.date}
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-500 leading-relaxed inter-font">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;
