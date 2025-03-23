"use client";
import { toggleMobileFilterVisible } from "@/app/features/mobileFilter/mobileFilterState";
import { Filter, Home, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

const MobileNav = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
}: {
  handleSearch: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  // const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-100 dark:bg-gray-800">
      <section className="relative md:hidden lg:hidden py-4 px-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-6 flex items-center pr-3 text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
          >
            <Search size={16} />
          </button>
        </form>
      </section>
      <section className="md:hidden lg:hidden flex items-center space-x-4 fixed  bottom-0 h-16 w-full shadow-2xl px-4 justify-between dark:bg-gray-800 dark:text-white">
        <Link href="/">
          <Home
            size={30}
            className="text-gray-600 dark:text-white hover:text-blue-600"
          />
          <span className="text-gray-600 dark:text-white">Home</span>
        </Link>
        <Link href="/cart">
          <ShoppingCart
            size={30}
            className="text-gray-600 dark:text-white hover:text-blue-600"
          />
          <span className="text-gray-600 dark:text-white">Cart</span>
        </Link>

        <button onClick={() => dispatch(toggleMobileFilterVisible())}>
          <Filter
            size={30}
            className="text-gray-600 dark:text-white hover:text-blue-600"
          />
          <span className="text-gray-600 dark:text-white">Filter</span>
        </button>
        <Link
          href="/mobile-user-account"
          className="flex flex-col items-center"
        >
          <User
            size={30}
            className="text-gray-600 dark:text-white hover:text-blue-600"
          />
          <span className="text-gray-600 dark:text-white ">My Account</span>
        </Link>
      </section>
    </nav>
  );
};

export default MobileNav;
