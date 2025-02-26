import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-16 text-black border-t border-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-3xl font-extrabold text-primary mb-4">Zang store</h4>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            Your one-stop destination for thoughtful and unique gifts.
          </p>
          <div className="flex space-x-6 text-3xl mt-4">
            <a href="https://www.facebook.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-primary hover:text-secondary transition cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-primary hover:text-secondary transition cursor-pointer" />
            </a>
            <a href="https://www.twitter.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-primary hover:text-secondary transition cursor-pointer" />
            </a>
          </div>
        </div>
        <div className="text-center md:text-right">
          <h5 className="text-2xl font-bold text-primary mb-4">Contact Us</h5>
          <p className="text-gray-600">
            No. 234 DB Zang junction Bukuru
            <br />
            Email: <a href="mailto:support@merabestie.com" className="hover:underline">support@Linux_dev.com</a>
            <br />
            Phone: <a href="tel:+911234567890" className="hover:underline">+234 9015648441</a>
          </p>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Zang s=tech store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
