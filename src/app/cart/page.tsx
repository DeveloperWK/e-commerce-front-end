"use client";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import SummaryCard from "../components/SummaryCard";
import useCartLogic from "@/app/hooks/useCartLogic";
const CartPage: React.FC = () => {
  const {
    cartItems,
    isLoading,
    removeCartLoading,
    summary,
    handleRemove,
    handleQuantityChange,
  } = useCartLogic();
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
                      {cartItems?.map((item) => (
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
