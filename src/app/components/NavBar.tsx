// components/Navbar.tsx
"use client";
import { useLazySearchQuery } from "@/app/api/apiSlice";
import DesktopNav from "@/app/components/NavBar/DesktopNav";
import MobileNav from "@/app/components/NavBar/MobileNav";
import { setHasSearched } from "@/app/features/hasSearched/hasSearched";
import { setSearchResults } from "@/app/features/searchResults/searchResults";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated, signOut } = useAuth();
  const [search, { data }] = useLazySearchQuery();
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setHasSearched(true));

    // Clear previous results before new search
    dispatch(setSearchResults([]));

    search(searchQuery);
  };

  useEffect(() => {
    // This effect will run whenever the data from the search query changes
    if (data) {
      dispatch(setSearchResults(data.products || []));
    }
  }, [data, dispatch]);

  useEffect(() => {
    // This effect handles clearing results when search query is empty
    if (!searchQuery) {
      dispatch(setSearchResults([]));
      dispatch(setHasSearched(false));
    }
  }, [searchQuery, dispatch]);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50  overflow-hidden">
      <section className="hidden md:block">
        <DesktopNav
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          isLoggedIn={isAuthenticated}
          signOut={signOut}
        />
      </section>
      <section className="md:hidden lg:hidden">
        <MobileNav
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </section>
    </nav>
  );
};

export default Navbar;
