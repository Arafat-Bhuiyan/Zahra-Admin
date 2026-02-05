import { Star } from "lucide-react";

export default function CourseReviews({ course }) {
  const reviews = [
    {
      id: 1,
      name: "Fatima Ahmed",
      rating: 5,
      date: "Jan 2024",
      text: "This course completely changed my perspective on managing anxiety. The combination of Islamic teachings and modern psychology is brilliant. Highly recommended!",
    },
    {
      id: 2,
      name: "Omar Hassan",
      rating: 5,
      date: "Jan 2024",
      text: "MashAllah, an excellent course. Dr. Sarah explains complex concepts in such an accessible way. The practical exercises have been life-changing.",
    },
    {
      id: 3,
      name: "Aisha Ibrahim",
      rating: 5,
      date: "Dec 2023",
      text: "I appreciated the balance between spiritual and scientific approaches. The dhikr practices have become part of my daily routine now.",
    },
    {
      id: 4,
      name: "Yusuf Ali",
      rating: 4,
      date: "Dec 2023",
      text: "Very informative and well-structured. Some lessons could be a bit shorter, but overall excellent content.",
    },
  ];

  return (
    <div className="bg-white border border-stone-100 rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-[#3A6E73] font-['Arimo']">Student Reviews</h2>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
          <span className="text-base font-bold text-gray-900">4.7</span>
          <span className="text-sm text-gray-500 font-medium">(245 reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-stone-200 rounded-xl p-8 transition-all duration-300 hover:shadow-md hover:border-stone-300">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-[#3C3C3C] font-['Arimo']">{review.name}</h4>
              <span className="text-sm text-gray-400 font-medium">{review.date}</span>
            </div>

            <div className="flex items-center gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating
                      ? "fill-[#FBBF24] text-[#FBBF24]"
                      : "fill-stone-200 text-stone-200"
                    }`}
                />
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
