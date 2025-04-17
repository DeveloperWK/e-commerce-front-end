import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
const EmptyCart: React.FC = () => {
  const MotionLink = motion(Link);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-full w-full"
    >
      <div className="text-center">
        <svg
          className="mx-auto w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-2 text-gray-600">
          Start shopping to add items to your cart.
        </p>
        <div className="mt-6">
          <MotionLink
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
