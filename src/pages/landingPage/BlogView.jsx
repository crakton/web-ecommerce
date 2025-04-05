import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../../blogData";

const BlogView = () => {
  const { id } = useParams();

  // Find the blog by ID
  const blog = blogs.find((b) => b.id === parseInt(id, 10));

  if (!blog) {
    return <div className="text-center py-20">Blog not found!</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-14 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Blog Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
          <p className="text-lg text-gray-600">{blog.description}</p>
        </div>

        {/* Thumbnail Image Section */}
        <div className="mb-6 rounded-3xl overflow-hidden ">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-[400px] object-cover transform transition-all duration-500 ease-in-out hover:scale-110 rounded-3xl"
          />
        </div>

        {/* Content Section */}
        <div className="mb-8 text-gray-800 text-base">
          <p>{blog.content}</p>
        </div>

        {/* Additional Images Section */}
        {blog.images && blog.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blog.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={image}
                  alt={`Additional image ${index + 1}`}
                  className="w-full h-[300px] object-cover transform transition-all duration-500 ease-in-out hover:scale-105 rounded-3xl"
                />
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        {/* <div className="mt-8 text-center">
          <a
            href="/blogs"
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors duration-300"
          >
            Back to Blogs
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default BlogView;
