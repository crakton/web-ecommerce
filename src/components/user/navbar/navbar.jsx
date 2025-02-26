import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSearchLine,
  RiCloseLine,
  RiMenu3Line,
  RiUser3Line,
  RiShoppingCart2Line,
  RiGift2Line,
  RiHome2Line,
  RiStore2Line,
  RiPhoneLine,
  RiInformationLine,
  RiLogoutBoxRLine,
  RiFileList3Line,
  RiUserAddLine,
  RiLoginBoxLine,
} from "react-icons/ri";
import SearchBar from "./SearchBar";
import { useCart } from "../../../hooks";

const ProfessionalNavbar = () => {
  const { fetchCart, memorizedCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState();
  const location = useLocation();
  const searchRef = useRef();
  const profileRef = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Handle click outside for search and profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const fetchUserName = useCallback(async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        const response = await fetch(`https://api.merabestie.com/auth/user/${userId}`);
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },[]);
  // Handle scroll, resize, and user data
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

   

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    fetchUserName();
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [fetchUserName]);
  
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const userId = sessionStorage.getItem("userId");

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 }
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }
    })
  };

  const navLinks = [
    { path: "/HomePage", name: "HOME", icon: RiHome2Line },
    { path: "/shop", name: "SHOP", icon: RiStore2Line },
    { path: "/Contact", name: "CONTACT", icon: RiPhoneLine },
  ];

  const categories = [
    { name: "Fashion", path: "/fashion" },
    { name: "Gift Items", path: "/gift-boxes" },
    { name: "Books", path: "/books" },
    { name: "Stationery", path: "/stationery" },
    { name: "All Products", path: "/shop" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md" : "bg-transparent"
    }`}>
      {/* Promo Banner - Hidden on mobile when scrolled */}
      <div className={`bg-primary text-white py-2 text-center text-xs transition-all duration-300 ${
        scrolled ? "hidden sm:block sm:h-auto sm:opacity-100" : "h-auto opacity-100"
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-center">
          <RiGift2Line className="mr-2" />
          <span className="text-[10px] sm:text-xs">
           Get your product, fast and reliable Delivery
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-[60px] sm:h-[70px] flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-black hover:text-primary transition"
            >
              <RiMenu3Line className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link
              to="/HomePage"
              className="text-2xl flex items-center hover:opacity-80 transition mx-auto lg:mx-0"
            >
              <span className="font-['Bodoni_MT'] font-bold text-2xl sm:text-3xl md:text-4xl text-primary">
                Zang store
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map(({ path, name, icon: Icon }) => (
                <div
                  key={path}
                  className="relative group"
                  onMouseEnter={() => name === "SHOP" && setIsShopDropdownOpen(true)}
                  onMouseLeave={() => name === "SHOP" && setIsShopDropdownOpen(false)}
                >
                  <button className={`px-4 py-2 mx-2 flex items-center ${
                    isActive(path) ? "text-primary" : "text-gray-800 hover:text-primary"
                  } transition-colors duration-200`}>
                    <Icon className="w-5 h-5 mr-2" />
                    {name}
                  </button>
                  {name === "SHOP" && isShopDropdownOpen && (
                    <div className="absolute mt-2 bg-white border rounded-lg shadow-lg">
                      {categories.map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          className="block px-4 py-2 hover:bg-pink-50"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button
                className="text-gray-800 hover:text-primary transition"
                onClick={toggleSearch}
              >
                <RiSearchLine className="w-5 h-5" />
              </button>

              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-primary transition flex items-center"
              >
                <RiShoppingCart2Line className="w-5 h-5" />
                <span className="ml-2 hidden md:block">Cart</span>
                {memorizedCartItemCount > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {memorizedCartItemCount}
                  </span>
                )}
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-800 hover:text-primary transition"
                >
                  <RiUser3Line className="w-5 h-5" />
                  <span className="ml-2 hidden md:block">
                    {userId ? `Hi, ${userName}` : "Profile"}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {userId ? (
                      <>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <RiFileList3Line className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <RiLogoutBoxRLine className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <RiLoginBoxLine className="w-4 h-4 mr-2" />
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <RiUserAddLine className="w-4 h-4 mr-2" />
                          Sign Up
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed inset-y-0 left-0 w-64 z-50 bg-white shadow-xl"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-['Bodoni_MT'] text-xl sm:text-2xl font-bold text-primary">
                Menu
              </span>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                <RiCloseLine className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="py-4">
              {navLinks.map(({ path, name, icon: Icon }, i) => (
                <motion.div
                  key={path}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    to={path}
                    className={`flex items-center px-6 py-3 ${
                      isActive(path)
                        ? "text-primary bg-pink-50"
                        : "text-gray-800 hover:bg-pink-50 hover:text-primary"
                    } transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {name}
                  </Link>
                </motion.div>
              ))}
              {name === "SHOP" && (
                <div className="pl-8 py-2 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block py-1 text-gray-600 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-t mt-4 pt-4">
                <Link
                  to="/cart"
                  className="flex items-center px-6 py-3 text-gray-800 hover:bg-pink-50 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RiShoppingCart2Line className="w-5 h-5 mr-3" />
                  Cart {memorizedCartItemCount > 0 && `(${memorizedCartItemCount})`}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
   {/* Previous code remains exactly the same until the Search Overlay section */}

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-4 rounded-lg w-full max-w-md mx-4"
              ref={searchRef}
            >
              <SearchBar />
              <button
                onClick={toggleSearch}
                className="mt-2 text-gray-600 hover:text-primary flex items-center justify-center w-full"
              >
                <RiCloseLine className="w-4 h-4 mr-2" />
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProfessionalNavbar;