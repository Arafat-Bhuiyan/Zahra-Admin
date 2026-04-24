import React from "react";
import { Star } from "lucide-react";

const CourseReviews = ({ reviews = [] }) => {
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
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-lg font-black text-stone-900 arimo-font">
                {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
              </span>
            </div>
            <span className="text-sm font-medium text-stone-400 inter-font">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
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
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-stone-50/30 rounded-3xl border-2 border-dashed border-stone-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Star className="w-8 h-8 text-stone-200" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-stone-800 arimo-font">No Reviews Yet</h4>
              <p className="text-stone-400 text-sm inter-font max-w-xs mx-auto">
                Once students complete this course and leave feedback, their reviews will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
