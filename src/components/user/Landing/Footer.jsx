import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import logo from "../../../assets/images/whiteLogo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Tagline */}
        <div className="text-center md:text-left">
          <img src = {logo} height={60} width={150} alt="Zang Global Logo" className="object-contain" />
          <p className="text-sm  mt-2 opacity-75">The Power Of Innovation </p>
        </div>

        {/* Contact Information */}
        <div className="text-center flex flex-col items-center my-4 md:my-0">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="text-sm opacity-75">No. 4 Lion Gate IV Plaza Opposite ITF Centre for Excellence, Bukuru Express Way, Jos, Plateau State, Nigeria</p>
          <p className="text-sm opacity-75">Tel: <a href="tel:+2349031743810" className="hover:text-gray-400">+2349031743810, +2347016705792</a></p>
          <p className="text-sm opacity-75">Email: <a href="mailto:info@zangglobal.com" className="hover:text-gray-400"> info@zangglobal.com</a></p>
          <p className="flex items-center my-2  gap-4">
              <FaWhatsapp  size={25} className="hover:text-gray-400 cursor-pointer" />
              <p>+2348101496175</p>
            </p>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex justify-center space-x-4 mt-2 text-2xl">
            <a href="https://www.facebook.com/zangglobal " target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/zangglobal" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href=" https://www.x.com/zangglobal" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href=" https://www.linkedin.com/company/zang-global" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-400 cursor-pointer" />
            </a>

          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4 opacity-75">
        &copy; {new Date().getFullYear()} Zang Global. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
