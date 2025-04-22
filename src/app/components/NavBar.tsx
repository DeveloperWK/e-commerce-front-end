"use client";
import { useLazySearchQuery } from "@/app/api/apiSlice";
import DesktopNav from "@/app/components/NavBar/DesktopNav";
import MobileNav from "@/app/components/NavBar/MobileNav";
import { setHasSearched } from "@/app/features/hasSearched/hasSearched";
import { setSearchResults } from "@/app/features/searchResults/searchResults";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDebounce } from "@/app/hooks/useDebounce";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated, signOut } = useAuth();
  const [search, { data }] = useLazySearchQuery();
  const dispatch = useDispatch();
  const cartCounter = useSelector(
    (state: RootState) => state.cartCounter.cartCounter,
  );
  const signOutHandler = () => {
    document.cookie = "role=; path=/";
    signOut();
  };
  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(setHasSearched(true));
      dispatch(setSearchResults([]));
      search(debouncedQuery);
    }
  }, [debouncedQuery, dispatch, search]);
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
  useEffect(() => {
    setCartCount(cartCounter || 0);
  }, [cartCounter]);
  const clearSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery("");
    dispatch(setHasSearched(false));
    dispatch(setSearchResults([]));
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50  overflow-hidden">
      <section className="hidden md:block">
        <DesktopNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          isLoggedIn={isAuthenticated}
          signOut={signOutHandler}
          clearSearch={clearSearch}
        />
      </section>
      <section className="md:hidden lg:hidden">
        <MobileNav
          searchQuery={searchQuery}
          cartCount={cartCount}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
      </section>
    </nav>
  );
};

export default Navbar;
