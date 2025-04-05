import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/images/logoYellow.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownOpen(null);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

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
    <nav className="fixed top-0 left-0 w-full bg-primary text-secondary shadow-lg py-4 px-5 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Company Logo"
          width={100}
          height={50}
          loading="lazy"
          className="h-auto"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-medium relative items-center">
        <a href="/#welcome" className="hover:text-mutedSecondary" onClick={closeMenu}>Home</a>
        <a href="/#contact" className="hover:text-mutedSecondary" onClick={closeMenu}>Contact</a>
        <Link to="/blogs" className="hover:text-mutedSecondary" onClick={closeMenu}>Blog</Link>

        {/* Company Dropdown */}
        <div className="relative dropdown">
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown("Company"); }} className="hover:text-mutedSecondary">
            Company ▾
          </button>
          <div className={`absolute left-0 mt-2 min-w-[180px] bg-mutedSecondary text-gray-700 rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 z-50 ${dropdownOpen === "Company" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            <a href="/#why-us" className="block px-5 py-3 text-sm hover:bg-gray-100 hover:text-primary transition duration-200" onClick={closeMenu}>Why Us</a>
            <a href="/#achievements" className="block px-5 py-3 border-y-[1px] border-mutedPrimary text-sm hover:bg-gray-100 hover:text-primary transition duration-200" onClick={closeMenu}>Achievements</a>
            <a href="/#about" className="block px-5 py-3 text-sm hover:bg-gray-100 hover:text-primary transition duration-200" onClick={closeMenu}>About Us</a>
          </div>
        </div>

        {/* Technology Dropdown */}
        <div className="relative dropdown">
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown("Technology"); }} className="hover:text-mutedSecondary">
            Technology ▾
          </button>
          <div className={`absolute left-[-60px] mt-2 min-w-[180px] bg-mutedSecondary text-gray-700 rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 z-50 ${dropdownOpen === "Technology" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            <Link to="/training" className="block px-5  border-b-[1px] border-mutedPrimary  py-3 text-sm hover:bg-gray-100 hover:text-primary transition duration-200" onClick={closeMenu}>Training Hub</Link>
            <Link to="/blog/1" className="block px-5 py-3 text-sm hover:bg-gray-100  border-b-[1px] border-mutedPrimary hover:text-primary transition duration-200" onClick={closeMenu}>Assistive Tech</Link>
            <Link to="/blog/12" className="block px-5 py-3 text-sm hover:bg-gray-100  border-b-[1px] border-mutedPrimary hover:text-primary transition duration-200" onClick={closeMenu}>Circulat Economy</Link>
            <Link to="/blog/11" className="block px-5 py-3 text-sm hover:bg-gray-100  border-b-[1px] border-mutedPrimary hover:text-primary transition duration-200" onClick={closeMenu}>Sustainability</Link>


          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} aria-label="Toggle menu" className="md:hidden text-secondary text-3xl">
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-primary text-white shadow-lg flex flex-col items-start px-6 py-10 space-y-4 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <a href="/#welcome" className="hover:text-background" onClick={closeMenu}>Home</a>
        <a href="/#contact" className="hover:text-background" onClick={closeMenu}>Contact</a>
        <Link to="/blogs" className="hover:text-background" onClick={closeMenu}>Blog</Link>

        {/* Company Dropdown Mobile */}
        <div className="w-full">
          <button onClick={() => toggleDropdown("Company")} className="w-full text-left hover:text-background">Company ▾</button>
          <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen === "Company" ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            <a href="/#why-us" className="block py-2 px-4 hover:bg-gray-200 hover:text-primary transition" onClick={closeMenu}>Why Us</a>
            <a href="/#achievements" className="block py-2 px-4 hover:bg-gray-200 hover:text-primary transition" onClick={closeMenu}>Achievements</a>
            <a href="/#about" className="block py-2 px-4 hover:bg-gray-200 hover:text-primary transition" onClick={closeMenu}>About Us</a>
          </div>
        </div>

        {/* Technology Dropdown Mobile */}
        <div className="w-full">
          <button onClick={() => toggleDropdown("Technology")} className="w-full text-left hover:text-background">Technology ▾</button>
          <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen === "Technology" ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            <Link to="/training" className="block py-2 px-4 hover:bg-gray-200 hover:text-primary transition" onClick={closeMenu}>Training Hub</Link>
            <Link to="/assistive-tech" className="block py-2 px-4 hover:bg-gray-200 hover:text-primary transition" onClick={closeMenu}>Assistive Tech</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
