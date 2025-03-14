import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/images/logoYellow.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMenu = () => setMobileMenuOpen(false);

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
      <div className="hidden md:flex space-x-6 text-secondary font-medium">
        <a href="/#welcome" className="hover:text-mutedSecondary">Home</a>
        <a href="/#why-us" className="hover:text-mutedSecondary">Why Us</a>
        <a href="/#achievements" className="hover:text-mutedSecondary">Achievements</a>
        <a href="/#contact" className="hover:text-mutedSecondary">Contact</a>
        <a href="#about" className="text-secondary hover:text-mutedSecondary" onClick={closeMenu}>About Us</a>

        <Link to="/blogs" className="hover:text-mutedSecondary">Blog</Link>

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
      </div>
      
    </nav>
  );
};

export default Navbar;
