import React, { useState } from "react";
import blogs from "../../blogData";
import BlogCard from "../../components/user/BlogCard";
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
     
          {/* Blog Heading */}
          <div>
          <div className="py-20 text-center">
            <h1 className="text-4xl font-bold">Blogs</h1>
            <p className="mt-4 text-lg">
              Explore insights, gain skills, and fuel your learning journey here.
            </p>
          </div>
        </div>
  
      {/* <BlogHeader blogs={blogs} /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterBlogs().map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-[#2f81b9] hover:shadow-sm transition-colors duration-300">
            Load More Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
