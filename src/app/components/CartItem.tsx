import React from "react";
import { motion } from "framer-motion";
import { CartItemType } from "../types/types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  disabled: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  disabled,
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row border-b border-gray-200 dark:border-gray-700 py-6 overflow-hidden"
    >
      <div className="flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.title}
          className="w-24 h-24 rounded-md object-cover object-center shadow-sm dark:shadow-gray-800/50"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
          <h3>{item?.product?.title}</h3>

          {typeof item?.product?.price === "number"
            ? `$${item?.product?.price.toFixed(2)}`
            : "N/A"}
        </div>
        {/*
        {item.color && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Color: {item.color}
          </p>
        )}
        {item.size && (
          <p className="text-gray-800 dark:text-gray-200">Size: {item.size}</p>
        )} */}

        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <label
              htmlFor={`quantity-${item._id}`}
              className="mr-2 text-gray-600 dark:text-gray-400"
            >
              Qty:
            </label>
            <select
              id={`quantity-${item.product._id}`}
              value={item.quantity}
              onChange={(e) =>
                onQuantityChange(item.product._id, parseInt(e.target.value))
              }
              className="order rounded-md py-1 px-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="button"
            onClick={() => onRemove(item?.product?._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={disabled}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Remove
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
