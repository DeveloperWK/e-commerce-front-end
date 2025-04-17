import React from "react";
import { CartSummary } from "@/app/types/types";

interface SummaryCardProps {
  summary: CartSummary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-gray-50 px-4 py-6 sm:px-6 rounded-lg">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Shipping</span>
          <span className="text-sm font-medium text-gray-900">
            ${summary.shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tax</span>
          <span className="text-sm font-medium text-gray-900">
            ${summary.tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-medium text-gray-900">Total</span>
          <span className="text-base font-medium text-gray-900">
            ${summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Checkout
      </button>
    </div>
  );
};

export default SummaryCard;
