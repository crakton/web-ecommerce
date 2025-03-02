import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaThLarge,
  FaList,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../../components/user/navbar/navbar";
import SEOComponent from "../../components/SEO/SEOComponent";
import ProductCard from "../../components/user/ProductCard";
const axios = require('axios');
const Shop = ({ category }) => {
  // State declarations
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [layout, setLayout] = useState("grid");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    {
      name: "Usb Cables",
      img: "https://cdn.igp.com/f_auto,q_auto,t_pnopt12prodlp/products/p-modish-fashion-necklace-25631-m.jpg",
      description: "Trendy accessories for every occasion",
    },
    {
      name: "Mini Power Banks",
      img: "http://images4.fanpop.com/image/photos/22200000/Christmas-gifts-christmas-gifts-22231235-2048-2048.jpg",
      description: "Perfect presents for your loved ones",
    },
    {
      name: "Power Banks",
      img: "https://tse2.mm.bing.net/th?id=OIP.uyi1Q5l2H8Zf9APJQplJfQHaEK&pid=Api&P=0&h=180",
      description: "Express your feelings with our cards",
    },
    {
      name: "Mobile Phones",
      img: "https://image.shutterstock.com/image-photo/image-250nw-1350723956.jpg",
      description: "High-quality stationery for all your needs",
    },
  ];

  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Effects and functions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.merabestie.com/get-product"
        );
        const data = await response.json();
        if (data.success) {
          const validProducts = data.products.filter(
            (product) =>
              product.name &&
              product.price &&
              product.img &&
              product.category &&
              product.productId &&
              (product.visibility === "on" || product.visibility === "true")
          );
          setProducts(validProducts);
          setFilteredProducts(validProducts);
          setBestSellers(validProducts.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryName) {
      const categoryExists = categories.some(
        (category) =>
          category.name.toLowerCase().replace(/ /g, "-") ===
          categoryName.toLowerCase().replace(/ /g, "-")
      );
      if (categoryExists) {
        setSelectedCategory(categoryName);
        filterProducts(categoryName);
      } else {
        setSelectedCategory("404");
      }
    }
  }, [categoryName]);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
    setLoadMore(6);
    setIsMobileMenuOpen(false);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    if (option === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "rating") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  if (selectedCategory === "404") {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <h1 className="text-4xl font-bold text-gray-900">404 Not Found</h1>
      </div>
    );
  }

  

  return (
    <>
      {/* <SEOComponent/> */}

      <div className="bg-gradient-to-r from-indigo-500 mt-[100px] via-pink-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm sm:text-base font-medium text-center animate-pulse">
            USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE ₦499 | FREE
            SHIPPING | COD AVAILABLE
          </p>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen pt-8">
        <Navbar className="sticky top-0 z-50 bg-white shadow-sm" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Today's Best Deals For You!
            </h1>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full sm:hidden px-4 py-2 bg-black text-white rounded-full mb-4"
                >
                  {isMobileMenuOpen ? "Close Categories" : "Show Categories"}
                </button>
                <div
                  className={`flex flex-wrap items-center gap-3 ${
                    isMobileMenuOpen ? "block" : "hidden"
                  } sm:flex`}
                >
                  <button
                    onClick={() => filterProducts("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => filterProducts(cat.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat.name
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium"
                >
                  <option value="default">Sort By: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
                <div className="flex gap-2 bg-white border border-gray-300 rounded-full p-1">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2 rounded-full transition-colors ${
                      layout === "grid"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <FaThLarge size={16} />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-2 rounded-full transition-colors ${
                      layout === "list"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <FaList size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`grid gap-6 ${
              layout === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {loading ? (
              <div className="col-span-full text-center">
                <p>Loading...</p>
              </div>
            ) : (
              filteredProducts
                .slice(0, loadMore)
                .map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))
            )}
          </div>

          {filteredProducts.length > loadMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setLoadMore((prev) => prev + 6)}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
