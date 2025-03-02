import { useState} from "react";
import { Link } from "react-router-dom";
import { TbCircleChevronsDown } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/images/logoYellow.png"


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow-lg py-4 px-5 flex justify-between items-center z-50">
      <div className="text-secondary text-xl md:text-2xl font-bold flex items-center gap-2">
        <img src={logo} width={100 } height={50} alt="image" />
        
      </div>

      <div className="hidden text-secondary md:flex space-x-6">
        <a href="/#welcome" className="hover:text-mutedSecondary">Home</a>
        <a href="/#why-us" className="hover:text-mutedSecondary">Why Us</a>
        <a href="/#achievements" className="hover:text-mutedSecondary">Achievements</a>
        <a href="/#contact" className="hover:text-mutedSecondary">Contact</a>
        <Link to="/blogs" className="hover:text-mutedSecondary">Blog</Link>
      </div>

      <button 
        id="menu-button"
        onClick={() =>{ setMobileMenuOpen(!mobileMenuOpen); console.log("Hello",mobileMenuOpen)}}
        className="md:hidden text-secondary text-3xl"
      >
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div 
        id="mobile-menu"
        className={`fixed top-0 left-0 w-64 h-full bg-primary shadow-lg flex flex-col items-center py-10 space-y-6 z-50 
        transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <a href="#welcome" className="text-secondary hover:text-background">Home</a>
        <a href="#why-us" className="text-secondary hover:text-background">Why Us</a>
        <a href="#achievements" className="text-secondary hover:text-background">Achievements</a>
        <a href="#contact" className="text-secondary hover:text-background">Contact</a>
        <Link to="/blogs" className="text-secondary hover:text-background">Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
