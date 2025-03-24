import { Link } from "react-router-dom";
import sampleImg from "../../../assets/images/zang.jpg";
import React from "react";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <section
      id="welcome"
      className="h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-primary px-6 md:px-16 lg:px-24 py-10 gap-10"
    >
      {/* Left Content */}
      <div className="flex flex-col gap-6 text-center md:text-left max-w-lg">
        <h3 className="text-3xl md:text-4xl font-bold text-secondary">
          The Power of Innovation
        </h3>

        <p className="text-mutedSecondary text-base md:text-lg leading-relaxed">
          Innovation is the key to unlocking a sustainable future. Our
          commitment to harnessing cutting-edge technologies and creative
          solutions empowers communities to thrive while protecting our planet.
        </p>

        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'We produce Power Banks',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'We produce Cables',
            1000,
            'We offer IT Training',
            1000,
            'Quality and Reliable Services',
            1000,
            'Fast and secure Payment/Delivery Services',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '1.5em', display: 'inline-block', color: "#eddb17", fontWeight: "bold" }}
          repeat={Infinity}
        />


        <Link
          className="bg-secondary text-primary px-6 py-3 rounded-md font-bold text-lg transition duration-300 hover:bg-opacity-80 mx-auto md:mx-0 w-fit"
          to="/store"
        >
          Shop Now
        </Link>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-[45%] flex justify-center">
        <img
          src={sampleImg}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
          alt="company"
        />
      </div>
    </section>
  );
}

export default Hero;
