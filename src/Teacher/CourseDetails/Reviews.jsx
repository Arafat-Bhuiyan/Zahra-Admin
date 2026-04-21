import { Star } from "lucide-react";
import { useGetCourseReviewsQuery } from "../../Api/adminApi";

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-[#FBBF24] text-[#FBBF24]" : "fill-stone-200 text-stone-200"}`}
        />
      ))}
    </div>
  );
}

export default function CourseReviews({ course }) {
  const courseId = course?.id;

  const { data, isLoading } = useGetCourseReviewsQuery(
    { courseId },
    { skip: !courseId }
  );

  const reviews = data?.results || [];
  const total = data?.count ?? 0;

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-[#3A6E73] font-['Arimo']">Student Reviews</h2>
        {!isLoading && avgRating && (
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
            <span className="text-base font-bold text-gray-900">{avgRating}</span>
            <span className="text-sm text-gray-500 font-medium">({total} review{total !== 1 ? "s" : ""})</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-stone-200 rounded-xl p-8 space-y-3">
              <div className="flex justify-between">
                <div className="h-5 bg-gray-100 animate-pulse rounded w-32" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-16" />
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-stone-200 rounded-xl p-8 transition-all duration-300 hover:shadow-md hover:border-stone-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-[#3C3C3C] font-['Arimo']">{review.user_name}</h4>
                <span className="text-sm text-gray-400 font-medium">
                  {new Date(review.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="mb-4">
                <StarRow rating={review.rating} />
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
