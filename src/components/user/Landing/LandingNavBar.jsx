import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/images/logoYellow.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownOpen(null); // Close dropdown when mobile menu is toggled
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null); // Close dropdown when clicking a link
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow-lg py-4 px-5 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img 
          src={logo} 
          width={100} 
          height={50} 
          alt="Company Logo" 
          loading="lazy"
          className="h-auto"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-secondary font-medium relative">
        <a href="/#welcome" className="hover:text-mutedSecondary" onClick={closeMenu}>Home</a>
        <a href="/#why-us" className="hover:text-mutedSecondary" onClick={closeMenu}>Why Us</a>
        <a href="/#achievements" className="hover:text-mutedSecondary" onClick={closeMenu}>Achievements</a>
        <a href="/#contact" className="hover:text-mutedSecondary" onClick={closeMenu}>Contact</a>
        <a href="#about" className="hover:text-mutedSecondary" onClick={closeMenu}>About Us</a>
        <Link to="/blogs" className="hover:text-mutedSecondary" onClick={closeMenu}>Blog</Link>

        {/* IT Dropdown */}
        <div className="relative dropdown">
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown("Technology"); }} className="">Technology ▾</button>
          {dropdownOpen === "Technology" && (
            <div className="absolute left-[-100px] mt-2 w-40 bg-primary shadow-lg flex flex-col">
              <Link to="/training" className="px-4 hover:text-primary py-2 hover:bg-gray-200" onClick={closeMenu}>Training Hub</Link>
              <Link to="/assistive-tech" className="px-4 py-2 hover:text-primary hover:bg-gray-200" onClick={closeMenu}>Assistive Tech</Link>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="md:hidden text-secondary text-3xl"
      >
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-64 h-full bg-primary shadow-lg flex flex-col items-center py-10 space-y-6 z-50 
        transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        role="navigation"
      >
        <a href="/#welcome" className="text-secondary hover:text-background" onClick={closeMenu}>Home</a>
        <a href="/#why-us" className="text-secondary hover:text-background" onClick={closeMenu}>Why Us</a>
        <a href="/#achievements" className="text-secondary hover:text-background" onClick={closeMenu}>Achievements</a>
        <a href="/#about" className="text-secondary hover:text-background" onClick={closeMenu}>About Us</a>
        <a href="/#contact" className="text-secondary hover:text-background" onClick={closeMenu}>Contact</a>
        <Link to="/blogs" className="text-secondary hover:text-background" onClick={closeMenu}>Blog</Link>

        {/* IT Dropdown */}
        <div className="text-primary dropdown">
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown("IT"); }} className="hover:text-background">Technology ▾</button>
          {dropdownOpen === "IT" && (
            <div className="flex flex-col">
              <Link to="/training" className="px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Training Hub</Link>
              <Link to="/assistive-tech" className="px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Assistive Tech</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
