// components/Navbar.tsx
"use client";
import React, { useState } from "react";
import DesktopNav from "./NavBar/DesktopNav";
import MobileNav from "./NavBar/MobileNav";

// Define the navbar item type
// type NavItem = {
//   name: string;
//   href: string;
//   icon?: React.ReactNode;
// };

const Navbar: React.FC = () => {
  //   const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartCount, setCartCount] = useState(0);

  // Example navigation items
  //   const navItems: NavItem[] = [
  //     { name: "Home", href: "/" },
  //     { name: "Products", href: "/products" },
  //     { name: "Categories", href: "/categories" },
  //     { name: "About", href: "/about" },
  //     { name: "Contact", href: "/contact" },
  //   ];

  // Mock function for search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  // Mock function for sign in/out
  const toggleSignIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  //   // Helper function to check if a link is active
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50  overflow-hidden">
      <section className="hidden md:block">
        <DesktopNav
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          toggleSignIn={toggleSignIn}
          isLoggedIn={isLoggedIn}
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
