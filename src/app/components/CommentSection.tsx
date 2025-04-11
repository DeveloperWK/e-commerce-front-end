import { useEffect, useState } from "react";

interface Comment {
  id: string;
  userName: string;
  text: string;
  date: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  productId: string;
}

export default function CommentSection({ productId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd fetch from an API
      // const res = await fetch(`/api/products/${productId}/comments`);
      // const data = await res.json();

      // Mock data for demonstration
      const mockComments: Comment[] = [
        {
          id: "1",
          userName: "Alex Johnson",
          text: "Does this product come with a warranty?",
          date: "2025-03-20",
          replies: [
            {
              id: "1-1",
              userName: "Store Support",
              text: "Yes, it includes a 2-year manufacturer warranty.",
              date: "2025-03-21",
            },
          ],
        },
        {
          id: "2",
          userName: "Sarah Williams",
          text: "How long does shipping usually take?",
          date: "2025-03-18",
          replies: [],
        },
      ];

      setTimeout(() => {
        setComments(mockComments);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !newComment.trim()) {
      setError("Please enter your name and comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      userName,
      text: newComment,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
    setError(null);

    // In a real app, you'd post to an API
    // await fetch(`/api/products/${productId}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(comment)
    // });
  };

  const handleSubmitReply = (commentId: string) => {
    if (!userName.trim() || !replyText.trim()) {
      setError("Please enter your name and reply");
      return;
    }

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      userName,
      text: replyText,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText("");
    setError(null);

    // In a real app, you'd post to an API
    // await fetch(`/api/products/${productId}/comments/${commentId}/replies`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(reply)
    // });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12">Loading comments...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4">Discussion</h3>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ask a question or leave a comment about this product"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No comments yet. Be the first to start the discussion!
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-800 mb-3">{comment.text}</p>
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
                </button>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 pl-6 border-l-2 border-gray-200">
                    <div className="mb-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your reply here..."
                      />
                    </div>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="px-4 py-1 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Post Reply
                    </button>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 space-y-4 border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                      <div key={reply.id}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm">
                            {reply.userName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
