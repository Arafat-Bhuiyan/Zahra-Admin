export default function CourseReviews({ course }) {
  const reviews = [
    {
      id: 1,
      name: "Student One",
      rating: 5,
      date: "Jan 15, 2024",
      text: "Excellent course! Very informative and well-structured.",
    },
    {
      id: 2,
      name: "Student Two",
      rating: 4,
      date: "Jan 10, 2024",
      text: "Great content. Would appreciate more practical exercises.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-700">4.8 ({reviews.length} reviews)</span>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-gray-300 text-sm">
                      ★
                    </span>
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
}
