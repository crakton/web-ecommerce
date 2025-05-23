import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSearchLine,
  RiCloseLine,
  RiMenu3Line,
  RiUser3Line,
  RiShoppingCart2Line,
  RiHome2Line,
  RiStore2Line,
  RiPhoneLine,
  RiLogoutBoxRLine,
  RiFileList3Line,
  RiUserAddLine,
  RiLoginBoxLine,
} from "react-icons/ri";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../assets/images/logoBlue.png";
import { fetchUser, logout } from "../../../redux/slice/authSlice";
import { fetchCart } from "../../../redux/slice/cartSlice";
import { FaCog } from "react-icons/fa";

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState();
  const location = useLocation();
  const searchRef = useRef();
  const profileRef = useRef();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const carts = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser()); // Fetch user data when logged in
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.userId));
    }
  }, [user, carts]);

  const cartItems = carts?.cart?.productsInCart;

  // Handle click outside for search and profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Fetch user data when logged out
    navigate("/login")
  };
  const menuVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  const navLinks = [
    { path: "/store", name: "HOME", icon: RiHome2Line },
    { path: "/shop", name: "SHOP", icon: RiStore2Line },
    { path: "/contact", name: "CONTACT", icon: RiPhoneLine },
  ];

  const categories = [
    { name: "cables", path: "/fashion" },
    { name: "Powerbanks", path: "/gift-boxes" },
    { name: "Solar Lanterns", path: "/books" },
    { name: "Chagers", path: "/stationery" },
    { name: "All Products", path: "/shop" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className=" px-3">
          <div className="h-[60px] sm:h-[70px] flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="sm:hidden text-black hover:text-primary transition"
            >
              <RiMenu3Line className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl flex items-center transition mx-auto lg:mx-0"
            >
              <img src={logo} width={120} />
            </Link>
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Link
                to={"/store"}
                className={`px-4 py-2 mx-2 flex items-center ${
                  isActive("/")
                    ? "text-primary"
                    : "text-gray-800 hover:text-primary"
                } transition-colors duration-200`}
              >
                <RiHome2Line className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link
                to={"/search"}
                className="text-gray-800 hover:text-primary transition"
              >
                <RiSearchLine className="w-5 h-5" />
              </Link>

              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-primary transition flex items-center"
              >
                <RiShoppingCart2Line className="w-5 h-5" />
                <div className="flex gap-1 items-center">
                  <span className="ml-2 hidden md:block">Cart</span>
                  <span className="text-xs bg-green-200 text-green-600 flex items-center justify-center py-[0.5px] px-[5px] rounded-full">
                    {user ? cartItems?.length : ""}
                  </span>
                </div>
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-800 hover:text-primary transition"
                >
                  <RiUser3Line className="w-5 h-5" />
                  <span className="ml-2 hidden md:block">
                    {user?.name===undefined?"": `Hi, ${user?.name}`}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {user ? (
                      <>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <RiFileList3Line className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 hover:bg-pink-50 transition"
                        >
                          <FaCog className="w-4 h-4 mr-2" />
                          Profile Settings
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
              <Link
                to="/"
                className="text-2xl flex items-center transition mx-auto lg:mx-0"
              >
                <img src={logo} width={100} />
              </Link>
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
                      {category?.name}
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
                  <RiShoppingCart2Line className="w-5 h-5 mr-3" />0
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
   
    </nav>
  );
};

export default ProfessionalNavbar;
