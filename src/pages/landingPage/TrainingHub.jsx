import React from "react";
import { Link } from "react-router-dom";

const TrainingHub = () => {
  return (
    <div className="bg-gray-100 mt-[50px] min-h-screen p-6">
     <header 
  className="relative h-[40vh] flex items-center justify-center flex-col text-center py-6 rounded-lg bg-cover bg-center"
  style={{ backgroundImage: "url('./icon.png')" }}
>
  
  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

  <div className="relative z-10 text-white">
    <h1 className="text-3xl font-bold">Welcome to Our Skills Training Hub</h1>
    <p className="mt-2 italic">
      “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” - Malcolm X
    </p>
  </div>
</header>

      <main className="mt-8 space-y-8">
        <section className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-600">E-waste Recycling into Sustainable Products</h2>
          <p className="mt-2 text-gray-700">
            Learn how to transform electronic waste into sustainable products. This program covers collection, dismantling, and recycling e-waste, along with innovative methods for repurposing materials.
          </p>
        </section>

        <section className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-600">Solar System Design, Installation, and Maintenance</h2>
          <p className="mt-2 text-gray-700">
            Dive into solar energy with comprehensive training on system design, installation, and maintenance. Learn best practices for promoting renewable energy solutions in communities.
          </p>
        </section>

        <section className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-600">AI and Robotics for Sustainable Development</h2>
          <p className="mt-2 text-gray-700">
            Explore the intersection of AI, robotics, and sustainability. Learn how modern technologies enhance efficiency in waste management, energy conservation, and resource optimization.
          </p>
        </section>
      </main>

      <footer className="mt-12 text-center bg-blue-600 text-white py-6 rounded-lg">
        <h2 className="text-xl font-semibold">Partner with Us</h2>
        <p className="mt-2">Join us in empowering marginalized communities through innovative training programs.</p>
        <Link to={"/#contact"} className="mt-4 bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-200">Contact Us</Link>
      </footer>
    </div>
  );
};

export default TrainingHub;