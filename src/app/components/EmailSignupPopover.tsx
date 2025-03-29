"use client";

import { useEffect, useState } from "react";

export default function EmailSignupPopover() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasDismissed = localStorage.getItem("dismissedEmailPopover");
    if (!hasDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("dismissedEmailPopover", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
      <div className="relative bg-white p-8 rounded-lg max-w-md w-[90vw] shadow-xl border border-gray-200">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-gray-700 transition-colors"
          aria-label="Close signup popover"
        >
          &times;
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Join Our Community!
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get 10% off your first order and exclusive deals.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
