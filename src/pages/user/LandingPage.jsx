import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sampleImg from "../../assets/images/sample.jpg";
import { whyUs } from "../../constants";
import { FaCheckCircle, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { TbCircleChevronsDown } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    return (
      <nav className="fixed top-0 left-0 w-full bg-background shadow-lg py-4 px-10 flex justify-between items-center z-50">
        <div className="text-white text-2xl font-bold flex items-center gap-2">
          <TbCircleChevronsDown size={30} />
          Zamda Global
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#welcome" className="text-white hover:text-blue-300">Home</a>
          <a href="#why-us" className="text-white hover:text-blue-300">Why Us</a>
          <a href="#progress" className="text-white hover:text-blue-300">Progress</a>
          <a href="#contact" className="text-white hover:text-blue-300">Contact</a>
        </div>
        
        {/* Mobile Nav Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white text-3xl">
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        
        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-background shadow-lg flex flex-col items-center py-10 space-y-6 z-50">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white text-3xl absolute top-4 right-4">
              <FiX />
            </button>
            <a href="#welcome" className="text-white hover:text-blue-300">Home</a>
            <a href="#why-us" className="text-white hover:text-blue-300">Why Us</a>
            <a href="#progress" className="text-white hover:text-blue-300">Progress</a>
            <a href="#contact" className="text-white hover:text-blue-300">Contact</a>
          </div>
        )}
      </nav>
    );
  };
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = totalDuration / end;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="text-4xl font-bold">{count}</span>;
};

const LandingPage = () => {
  return (
    <main className="p-10">
      <Navbar />

      {/* Welcome */}
      <section id="welcome" className=" h-screen flex flex-col md:flex-row items-center justify-around bg-background p-10">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h3 className="text-4xl font-bold text-white">Let's make your vision come to life</h3>
          <Link className="bg-blue text-white px-6 py-2 rounded-md font-bold w-fit mx-auto md:mx-0" to="/store">
            Shop Now
          </Link>
        </div>
        <img src={sampleImg} className="w-80 h-auto rounded-lg shadow-lg" alt="company" />
      </section>

      {/* Why Us */}
      <section id="why-us" className="bg-blue text-white flex flex-col items-center justify-center h-screen p-16 w-full">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <p className="text-center max-w-2xl">
          We offer high-grade quality products, from gadgets to daily electronics and more.
        </p>
        <div className="flex flex-wrap gap-5 justify-center mt-6">
          {whyUs.map((item, index) => (
            <div className="bg-white p-6 text-background font-bold rounded-md gap-4 border border-background flex items-center flex-col shadow-md w-60 text-center" key={index}>
                <FaCheckCircle size={45} />
              {item.title}
            </div>
          ))}
        </div>
      </section>

      {/* Progress */}
      <section id="progress" className="w-full h-screen flex flex-col bg-slate-50 items-center justify-center py-16">
        <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-blue text-white p-6 rounded-lg flex flex-col items-center shadow-lg">
            <Counter value={99} /> 
            <p>Projects Completed</p>
          </div>
          <div className="bg-red-400 text-white p-6 rounded-lg flex flex-col items-center shadow-lg">
            <span>

            <Counter value={10} /> 
            </span>
            <p>Years of Experience</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg flex flex-col items-center shadow-lg">
            <Counter value={3} />
            <p>Offices Nationwide</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full h-screen flex flex-col md:flex-row items-center justify-around px-10 py-16 bg-background text-white">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <TbCircleChevronsDown size={50} />
            <p className="text-2xl font-bold">Zamda Global</p>
          </div>
          <img src={sampleImg} className="w-40 h-auto rounded-lg" alt="company logo" />
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Headquarters</h2>
          <p>Bukuru, Jos South, Plateau State, Nigeria</p>
          <p>Tel: +2349015648441</p>
          <p>Email: Ld604068@gmail.com</p>
          <h2 className="text-2xl font-semibold mt-6 mb-3">Office Hours</h2>
          <p>Monday to Friday, 9:00 AM - 5:00 PM</p>
          <p>Weekends by appointment</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-6 text-3xl">
            <a href="https://www.facebook.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blue-400 hover:text-blue-600" />
            </a>
            <a href="https://www.instagram.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:text-pink-700" />
            </a>
            <a href="https://www.twitter.com/merabestie" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-300 hover:text-blue-500" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
