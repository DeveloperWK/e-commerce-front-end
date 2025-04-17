"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import SummaryCard from "../components/SummaryCard";
import { CartItemType, CartSummary } from "@/app/types/types";
import {
  useLazyGetCartQuery,
  useRemoveCartItemMutation,
} from "../api/apiSlice";
import { getLocalStorage } from "../utility/storageUtils";
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [getCart, { isLoading }] = useLazyGetCartQuery({});
  const [removeCartItem, { isLoading: removeCartLoading }] =
    useRemoveCartItemMutation();
  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart({});
      if (res.data) {
        setCartItems(res.data?.cart?.items);
      } else {
        console.error("Failed to fetch cart:", res.error);
      }
    };
    fetchCart();
  }, []);
  console.log("cartLength", cartItems.length);
  const subtotal = cartItems?.reduce(
    (sum: number, item) => sum + item?.product?.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const summary: CartSummary = {
    subtotal,
    shipping,
    tax,
    total,
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    removeCartItem({
      productId: id,
      userId: getLocalStorage("userId") as string,
    });
    setCartItems(cartItems.filter((item) => item?.product?._id !== id));
  };
  if (isLoading)
    return (
      <>
        {" "}
        <p className="flex  justify-center text-gray-900 dark:text-gray-100 pt-20">
          Cart Loading...
        </p>
      </>
    );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          🛒 Your Shopping Cart
        </h2>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-center tracking-tight text-gray-900 dark:text-white mb-10"
          >
            Review Your Items
          </motion.h1>

          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <section className="lg:col-span-7">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <motion.ul
                    layout
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.li key={item._id} layout className="py-6">
                          <CartItem
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                            disabled={removeCartLoading}
                          />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </AnimatePresence>
            </section>

            {/* Order Summary */}
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 lg:mt-0 lg:col-span-5 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md p-6 sm:p-8"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Order Summary
                  </h3>
                  <SummaryCard summary={summary} />
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CartPage;
