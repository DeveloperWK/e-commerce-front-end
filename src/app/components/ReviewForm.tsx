// components/ReviewForm.tsx
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { useCreateReviewMutation } from "../api/apiSlice";
import { getLocalStorage } from "../utility/storageUtils";

// interface ReviewFormProps {
//   onSubmit: (review: {
//     userName: string;
//     rating: number;
//     comment: string;
//   }) => void;
// }

export default function ReviewForm({ productId }: { productId: string }) {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userName.trim()) {
      newErrors.userName = "Name is required";
    }

    if (!comment.trim()) {
      newErrors.comment = "Review comment is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      createReview({
        user: getLocalStorage("userId") as string,
        product: productId,
        rating,
        comment,
      });
      //   rating,
      //   comment,
      // });

      // Reset form
      setUserName("");
      setRating(5);
      setComment("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.userName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userName && (
            <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <StarIcon
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.comment ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
