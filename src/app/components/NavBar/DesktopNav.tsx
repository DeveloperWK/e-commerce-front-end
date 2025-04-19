import { LogOut, Search, ShoppingCart, Store, User, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DesktopNav = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
  cartCount,
  isLoggedIn,
  signOut,
  clearSearch,
}: {
  handleSearch: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  isLoggedIn: boolean;
  signOut: () => void;
  clearSearch: (e: React.FormEvent) => void;
}) => {
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
            {/* Nav Links */}
            {/* <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div> */}

            {/* Search Form */}
            {shopPage && (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-1 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-700 dark:text-gray-300 dark:bg-gray-800"
                />
                {!searchQuery ? (
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600"
                  >
                    <Search size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600"
                  >
                    <XIcon size={16} />
                  </button>
                )}
              </form>
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
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
