import { StarIcon } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-600">
          No reviews yet. Be the first to leave a review!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">{review.userName}</h4>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
