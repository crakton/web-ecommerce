import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {
  FaMinus,
  FaPlus,
  FaStar,
  FaTag,
  FaBox,
  FaShippingFast,
  FaWarehouse,
  FaExclamationCircle
} from 'react-icons/fa';
import Navbar from '../../components/user/navbar/navbar';
import { Helmet } from "react-helmet";
import ReviewSection from './ReviewSection';
import ReviewForm from './ReviewForm';
import { fetchProductById } from '../../config/api';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { prepareStackTrace } from 'postcss/lib/css-syntax-error';
import { useDispatch, useSelector } from 'react-redux';
import AddToCart from '../../components/user/addToCart';


const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // Added state for selected image
  const [quantity, setQuantity] = useState(1);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [stockStatus, setStockStatus] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!productId) return; // Prevent API call if productId is invalid

    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data)
        calculateStockStatus(data);
        console.log(product)
      } catch (error) {
      } finally {

      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://api.merabestie.com/reviews/find-reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        if (data.message === 'No reviews found for this product') {
          setReviews([]);
        }
        else {
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [productId]);


  const calculateStockStatus = (productData) => {
    if(!productData){
      console.log("no stock details")
    }

    const stock = productData.inStockValue || 0;
    let status = '';
    let color = '';
    console.log(productData)

    if (stock > 50) {
      status = 'In Stock';
      color = 'text-green-600 bg-green-50';
    } else if (stock > 10) {
      status = 'Low Stock';
      color = 'text-yellow-600 bg-yellow-50';
    } else if (stock > 0) {
      status = 'Very Low Stock';
      color = 'text-orange-600 bg-orange-50';
    } else {
      status = 'Out of Stock';
      color = 'text-red-600 bg-red-50';
    }

    setStockStatus({ status, color, stock });
  };


  const updateRecentlyViewed = (productData) => {
    let viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    viewedProducts = viewedProducts.filter((p) => p.productId !== productData.productId);
    viewedProducts.unshift(productData);
    if (viewedProducts.length > 5) {
      viewedProducts.pop();
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts));
    setRecentlyViewed(viewedProducts);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (stockStatus?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };




  const handleWriteReview = () => {
    setShowReviewDialog(true);
  };

  const closeReviewDialog = () => {
    setShowReviewDialog(false);
  };

  const handlePreviousImage = () => {
  setSelectedImage((prevIndex) =>
    prevIndex === 0 ? product.img.length - 1 : prevIndex - 1
  );
};

const handleNextImage = () => {
  setSelectedImage((prevIndex) =>
    prevIndex === product.img.length - 1 ? 0 : prevIndex + 1
  );
};


  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skeleton for Image */}
            <div className="bg-gray-50 flex flex-col items-center">
              <Skeleton height={500} width="100%" />
              <div className="flex mt-4 space-x-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} width={64} height={64} />
                ))}
              </div>
            </div>

            {/* Skeleton for Product Info */}
            <div className="p-6 space-y-4">
              <Skeleton height={40} width="80%" />
              <Skeleton height={30} width="60%" />
              <Skeleton height={20} width="30%" />
              <Skeleton height={50} width="100%" />
              <Skeleton height={50} width="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} </title>
      </Helmet>
      <Navbar />
      <ToastContainer />

      <div className="min-h-screen  mt-[100px] ">
        <div className="max-w-6xl mx-auto px-1 sm:px-3 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" rounded-xl shadow-2xl overflow-hidden border border-pink-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image Section */}
              <div className="p-2 bg-gray-50 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full max-w-md h-[250px] relative"
                >
                  <img
                    src={product.img[selectedImage]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-xl shadow-lg"
                  />
                  {/* Previous Button */}
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-700 rounded-full p-2"
                  >
                    &#8592;
                  </button>
                  {/* Next Button */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-700 rounded-full p-2"
                  >
                    &#8594;
                  </button>
                </motion.div>
                <div className="flex mt-1  space-x-2">
                  {product.img.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 object-cover rounded ${selectedImage === index ? "border-2 border-pink-600" : "border"} cursor-pointer`}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-2 space-y-2q">
                {/* Header Section with Name and Price */}
                <div className="border-b border-pink-100 pb-6">
                  <h1 className="text-lg font-bold text-gray-900 mb-1 bg-gradient-to-r from-pink-600 to-rose-500 text-transparent bg-clip-text">
                    {product.name}
                  </h1>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      ₦{product.price}
                    </p>
                    <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-400" />
                      <span className="font-medium text-yellow-600">
                        {product.rating}
                      </span>                    </div>
                  </div>
                  <p className='text-xs'>
                    {
                      product.description
                    }
                  </p>
                </div>

                {/* Stock Status Section */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`px-4 py-2 rounded-md flex items-center ${stockStatus?.color}`}
                  >
                    {stockStatus?.status === "In Stock" && (
                      <FaBox className="mr-2 text-green-600" />
                    )}
                    {stockStatus?.status === "Low Stock" && (
                      <FaExclamationCircle className="mr-2 text-orange-200" />
                    )}
                    {stockStatus?.status === "Very Low Stock" && (
                      <FaWarehouse className="mr-2 text-orange-600" />
                    )}
                    {stockStatus?.status === "Out of Stock" && (
                      <FaShippingFast className="mr-2 text-red-600" />
                    )}
                    <span className="font-medium">
                      {stockStatus?.status} {stockStatus?.stock} available
                    </span>
                  </div>
                  <div className="bg-mutedSecondary px-4 py-2 rounded-md flex items-center">
                    <FaTag className="mr-2 text" />
                    <span className="font-medium text-primary">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Quantity Section */}
                <div className="flex items-center space-x-4 py-6">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xl font-medium text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    disabled={quantity >= stockStatus?.stock}
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="flex justify-evenly items-center w-full gap-5">
                <AddToCart product={product} quantity={quantity} />

                  <button
                    className="w-1/2 py-2 bg-primary text-sm text-white font-semibold rounded-lg hover:bg-mutedPrimary"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <ReviewSection
            reviews={reviews}
            onWriteReview={() => setShowReviewForm(true)}
          />
          {showReviewForm && (
            <ReviewForm
              productId={productId}
              onClose={() => setShowReviewForm(false)}
              onSubmitSuccess={(newReview) => {
                setReviews([newReview, ...reviews]);
                setShowReviewForm(false);
              }}
            />
          )}
          {/* Recently Viewed Section */}
          {recentlyViewed.length > 0 && (
            <div className="mt-12 max-w-7xl mx-auto p-9 pt-0">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Recently Viewed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentlyViewed.map((item) => (
                  <Link key={item.productId} to={`/${item.productId}`}>
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                      <img
                        src={item.img[0] ? item.img[0] : item.img}
                        alt={item.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-pink-600">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
