import { LogOut, ShoppingCart, Store, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchForm from "../SearchForm";
import {NavBarProps} from "@/app/types/types";
const DesktopNav = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  isLoggedIn,
  signOut,
  clearSearch,
}: NavBarProps) => {
  const path = usePathname();
  const shopPage = path === "/shop";
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="E-commerce Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-800 ml-2">
                ShopNext
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Form */}
            {shopPage && (
              <SearchForm
                btnClass="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600"
                clearSearch={clearSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputClass="py-1 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-700 dark:text-gray-300 dark:bg-gray-800"
              />
            )}
            <Link
              href="/shop"
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2"
            >
              <Store size={20} className="text-gray-600" />
              <span>Store</span>
            </Link>
            {/* Sign-Up */}
            <Link
              href="/sign-up"
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2"
            >
              <User size={16} />
              <span>Sign Up</span>
            </Link>
            {/* Sign In/Out */}
            {isLoggedIn ? (
              <button
                onClick={signOut}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2"
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
            )}
            {/* Cart */}
            <Link href="/cart" aria-label="Cart">
            <div className="flex flex-col items-center space-y-1 relative">
              {/* Cart Count Badge */}
              {cartCount > 0 && (
                  <span
                      className="absolute -top-3 left-1/2 w-5 h-5 text-[10px] font-bold text-white bg-red-500
                   rounded-full flex items-center justify-center z-10 transform -translate-x-1/2"
                  >
        {cartCount}
      </span>
              )}
              {/* Shopping Cart Icon */}
              <ShoppingCart
                  size={24}
                  className="text-gray-600 dark:text-white hover:text-blue-600 transition-colors duration-200"
              />
              {/* Label */}
              <span className="text-xs text-gray-600 dark:text-white mt-1">Cart</span>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
