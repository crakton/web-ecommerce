import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TbCircleChevronsDown } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";
import Carousel from "../../components/user/Carousel";
import sampleImg from "../../assets/images/zang.jpg";
import { whyUs } from "../../constants";
import Navbar from "../../components/user/navbar/LandingNavBar";
import { motion } from "framer-motion";
import ContactUs from "./contact";
import logo2 from "../../assets/images/logoYellow.png"

import {TypeAnimation} from "react-type-animation"


// export const LandingNavbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-primary shadow-lg py-4 px-5 flex justify-between items-center z-50">
//       <div className="text-secondary text-xl md:text-2xl font-bold flex items-center gap-2">
//         <TbCircleChevronsDown size={30} /> Zamda Global
//       </div>
//       <div className="hidden text-secondary md:flex space-x-6">
//         <a href="#welcome" className="hover:text-background">Home</a>
//         <a href="#why-us" className="hover:text-background">Why Us</a>
//         <a href="#progress" className="hover:text-background">Progress</a>
//         <a href="#contact" className="hover:text-background">Contact</a>
//         <Link to="/blogs" className="hover:text-background">Blog</Link>
//       </div>
//       <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-secondary text-3xl">
//         {mobileMenuOpen ? <FiX /> : <FiMenu />}
//       </button>
//       {mobileMenuOpen && (
//         <div className="fixed top-0 left-0 w-64 h-full bg-primary shadow-lg flex flex-col items-center py-10 space-y-6 z-50">
//           <a href="#welcome" className="text-secondary hover:text-background">Home</a>
//           <a href="#why-us" className="text-secondary hover:text-background">Why Us</a>
//           <a href="#progress" className="text-secondary hover:text-background">Progress</a>
//           <a href="#contact" className="text-secondary hover:text-background">Contact</a>
//           <Link to="/blogs" className="text-secondary hover:text-background">Blog</Link>
//         </div>
//       )}
//     </nav>
//   );
// };

const LandingPage = () => {

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
  
  return <motion.span whileInView={{ scale: 1.2 }} transition={{ duration: 0.5 }}>{count}+</motion.span>;
    
  };




const Achievements = () => {
  return (
    <section
      id="achievements"
      className="w-full h-screen md:h-[60vh] flex flex-col bg-primary px-6 md:px-10 items-center justify-center py-16"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-secondary mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Achievements
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <motion.div
          className="bg-mutedSecondary text-background p-6 rounded-lg flex flex-col items-center shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Counter value={99} />
          <p>Projects Completed</p>
        </motion.div>

        <motion.div
          className="bg-mutedSecondary text-background p-6 rounded-lg flex flex-col items-center shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Counter value={10} />
          <p>Years of Experience</p>
        </motion.div>

        <motion.div
          className="bg-mutedSecondary text-background p-6 rounded-lg flex flex-col items-center shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Counter value={30} />
          <p>Offices Nationwide</p>
        </motion.div>
      </div>
    </section>
  );
};
  
  
  return (
    <main className="md:px-2">
      <Navbar />
      <section id="welcome" className="h-screen flex flex-col md:flex-row items-center justify-around bg-primary p-10">
        <div className="flex flex-col gap-6 text-center md:text-left">

          <h3 className="text-4xl font-bold text-secondary">Bringing Power to Your Hands</h3>

          <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'We produce  for Power Banks',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce  for Power USB cables',
        1000,
        'We offer Services for IT training',
        1000,
      ]}
      wrapper="span"
      speed={50}
      className="text-mutedSecondary font-bold text-2xl"
      repeat={Infinity}
    />
          <Link className="bg-secondary text-primary px-6 py-2 rounded-md font-bold w-fit mx-auto md:mx-0" to="/store">Shop Now</Link>
        </div>
        <img src={sampleImg} className="md:w-[40%] md:h-[80%] rounded-lg shadow-lg" alt="company" />
      </section>

      {/* why us */}
      <section id="why-us" className="bg-mutedSecondary text-primary flex flex-col items-center justify-center md:h-[70vh] p-16 w-full">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <p className="text-center max-w-2xl">We offer high-quality power solutions that keep you connected at all times.</p>
        <div className="flex flex-wrap gap-5 justify-center mt-6">
          {whyUs.map((item, index) => (
            <div className="bg-primary md:p-4 p-4 text-secondary font-bold rounded-md border border-secondary flex items-center flex-col shadow-md md:w-40 w-60 text-center" key={index}>
              <FaCheckCircle size={35} />
              <p className="text-center text-xs md:text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

<Achievements />

      {/* Carousel */}
      <section className=" bg-primary">
        <Carousel />
        <ContactUs />
      </section>
      <footer className="bg-background text-secondary py-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <img src={logo2} height={60} width={150} />
            <p className="text-sm mt-2">Bringing Power to Your Hands</p>
          </div>
          <div className="text-center my-4 md:my-0">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-sm">Bukuru, Jos South, Plateau State, Nigeria</p>
            <p className="text-sm">Tel: +2349015648441</p>
            <p className="text-sm">Email: Ld604068@gmail.com</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <div className="flex justify-center space-x-4 mt-2 text-2xl">
              <FaFacebook className="hover:text-background cursor-pointer" />
              <FaInstagram className="hover:text-background cursor-pointer" />
              <FaTwitter className="hover:text-background cursor-pointer" />
              <FaLinkedin className="hover:text-background cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-6 border-t border-secondary pt-4">
          &copy; {new Date().getFullYear()} Zang Global. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;





