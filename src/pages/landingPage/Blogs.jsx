import React, { useState } from "react";
import blogs from "../../blogData";
import BlogCard from "../../components/user/BlogCard";
import Navbar from "../../components/user/Landing/LandingNavBar";
import backgroundImage from "../../assets/images/Home.jpg"

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterBlogs = () => {
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>


      {/* Blog Heading */}
      <div className="relative py-20 text-center z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4">Blogs</h1>
        <p className="text-lg text-white">
          Explore insights, gain skills, and fuel your learning journey here.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto px-4 py-6 z-10">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search blogs..."
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
      {/* Blog Grid Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Our Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filterBlogs().map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-[#2f81b9] hover:shadow-lg transition-colors duration-300">
            Load More Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
