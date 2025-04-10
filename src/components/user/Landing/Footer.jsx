import { Link } from "react-router-dom";
import logo from "../../../assets/images/whiteLogo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div>
          <img src={logo} height={60} width={150} alt="Zang Global Logo" className="object-contain" />
          <p className="text-sm mt-2 opacity-75">The Power of Innovation</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#welcome" className="hover:underline hover:text-mutedSecondary transition duration-200">Home</a></li>
            <li><Link to="/blogs" className="hover:underline hover:text-mutedSecondary transition duration-200">Blog</Link></li>
            <li><a href="/store" className="hover:underline hover:text-mutedSecondary transition duration-200">Shop</a></li>
            <li><a href="/#contact" className="hover:underline hover:text-mutedSecondary transition duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Technology */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Technology</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog/11" className="hover:underline hover:text-mutedSecondary transition duration-200">Manufacturing</Link></li>
            <li><Link to="/blog/12" className="hover:underline hover:text-mutedSecondary transition duration-200">Circular Economy</Link></li>
            <li><Link to="/training" className="hover:underline hover:text-mutedSecondary transition duration-200">Training Hub</Link></li>
            <li><Link to="/blog/1" className="hover:underline hover:text-mutedSecondary transition duration-200">Assistive Tech</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#why-us" className="hover:underline hover:text-mutedSecondary transition duration-200">Why Us</a></li>
            <li><a href="/#achievements" className="hover:underline hover:text-mutedSecondary transition duration-200">Achievements</a></li>
            <li><a href="/#about" className="hover:underline hover:text-mutedSecondary transition duration-200">About Us</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter / Social */}
      <div className="mt-10 bg-gray-200/20 w-fit p-10 rounded-md shadow-md shadow-gray-300/30">
        <h3 className="text-lg font-semibold mb-4">Stay in Touch</h3>
        <p className="text-sm mb-4">Get the latest updates, offers & more.</p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 text-sm rounded-md focus:outline-none text-black flex-1"
          />
          <button className="bg-secondary text-primary font-semibold px-4 py-2 text-sm rounded-md hover:bg-opacity-80 transition">
            Subscribe
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-mutedPrimary pt-5">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
