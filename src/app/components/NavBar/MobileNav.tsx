"use client";
import { toggleMobileFilterVisible } from "@/app/features/mobileFilter/mobileFilterState";
import { Filter, Home, ShoppingCart, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import SearchForm from "../SearchForm";
import {NavBarProps} from "@/app/types/types";

const MobileNav = ({
  searchQuery,
  setSearchQuery,
  clearSearch,
  cartCount
}:NavBarProps) => {
  const dispatch = useDispatch();
  const path = usePathname();
  const shopPage = path === "/shop";
  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <section className="relative md:hidden lg:hidden py-4 px-4">
        {shopPage && (
          <SearchForm
            btnClass="absolute inset-y-0 right-6 flex items-center pr-3 text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
            inputClass="py-1 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
          />
        )}
      </section>
      <section className="md:hidden lg:hidden flex items-center justify-around h-16 w-full shadow-2xl px-4 bg-white dark:bg-gray-800 dark:text-white fixed bottom-0 z-50">
        {/* Home Link */}
        <Link href="/" aria-label="Home">
          <div className="flex flex-col items-center space-y-1">
            <Home
              size={24}
              className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
            />
            <span className="text-xs text-gray-600 dark:text-white">Home</span>
          </div>
        </Link>
        {/* Store Link */}
        <Link href="/shop" aria-label="Store">
          <div className="flex flex-col items-center space-y-1">
            <Store
              size={24}
              className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
            />
            <span className="text-xs text-gray-600 dark:text-white">Store</span>
          </div>
        </Link>
        {/* Cart Link */}
        <Link href="/cart" aria-label="Cart" className="relative">
          <div className="flex flex-col items-center space-y-1">
            <div className="relative">
              <ShoppingCart
                  size={24}
                  className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
              />
              {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
              )}
            </div>
            <span className="text-xs text-gray-600 dark:text-white">Cart</span>
          </div>
        </Link>


        {/* Filter Button */}
        {shopPage && (
          <button
            onClick={() => dispatch(toggleMobileFilterVisible())}
            aria-label="Filter"
            className="flex flex-col items-center space-y-1"
          >
            <Filter
              size={24}
              className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
            />
            <span className="text-xs text-gray-600 dark:text-white">
              Filter
            </span>
          </button>
        )}

        {/* My Account Link */}
        <Link href="/mobile-user-account" aria-label="My Account">
          <div className="flex flex-col items-center space-y-1">
            <User
              size={24}
              className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
            />
            <span className="text-xs text-gray-600 dark:text-white">
              My Account
            </span>
          </div>
        </Link>
      </section>
    </nav>
  );
};

export default MobileNav;
