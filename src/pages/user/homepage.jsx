import React, { useState, useEffect, useMemo } from 'react';
import Footer from "../../components/user/footer/footer";
import Navbar from "../../components/user/navbar/navbar";
import { FaStar } from "react-icons/fa";
import SEOComponent from "../../components/SEO/SEOComponent"
import CartItems from "../../components/user/cart/Cartitems";
import { fetchProducts } from '../../config/api';
import { useCart } from '../../hooks';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        backgroundColor: '#2e3192',
        transition: 'width 0.3s ease-out',
        zIndex: 1000,
      }}
    />
  );
};

const Carousel = ({ slides, currentSlide }) => (
  <div className="relative w-full">
    <div 
      className="h-48 sm:h-64 md:h-96 w-full bg-cover bg-center transition-all duration-300" 
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="flex flex-col items-center justify-center h-full text-white p-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-center">{slides[currentSlide].title}</h2>
          <p className="text-sm md:text-lg mt-2 text-center max-w-md">{slides[currentSlide].description}</p>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const memorizedUserId = useMemo(() => sessionStorage.getItem('userId'), []);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      <div className="relative">
        <img
          src={product.img[0] || "/fallback-image.jpg"}
          alt={product.name}
          className="w-full h-36 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-75 text-white opacity-0 hover:opacity-100 transition-all duration-300">
          Shop Now
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <span className="text-xs sm:text-sm font-semibold">₹{product.price}</span>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 text-xs sm:text-sm mr-1" />
            <span className="text-xs sm:text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:space-x-4">
          <button
            className="w-full sm:w-auto bg-indigo-500 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-indigo-600 transition-colors"
            onClick={() => onAddToCart(product.productId, +1)}
          >
            Add to Cart
          </button>
          <button
            className="w-full sm:w-auto bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-orange-600 transition-colors"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ title, products }) => {
  const { handleCheckout, sideCartVisible, setSideCartVisible, addToCart } = useCart();
  const memorizedUserId = useMemo(() => sessionStorage.getItem("userId"), []);

  const handleBuyNow = async (product) => {
    await addToCart(memorizedUserId, product.productId, +1);
    window.location.href = "/cart";
  };

  return (
    <section className="container mx-auto px-4 py-6 sm:py-8">
      {sideCartVisible && (
        <div className="fixed bottom-0 right-0 top-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out">
          <div className="relative h-full flex flex-col">
            <button 
              onClick={() => setSideCartVisible(false)}
              className="absolute top-4 right-4 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 p-4 pt-16 overflow-y-auto">
              <CartItems />
            </div>

          {/*   <div className="p-4 bg-white border-t">
              <button 
                className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div> */}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        <a href="/shop">
          <button className="w-full sm:w-auto bg-primary text-secondary px-4 py-2 rounded-md text-sm font-medium hover:bg-[rgb(46 49 162)] transition-colors">
            View All
          </button>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onAddToCart={addToCart}
            onBuyNow={handleBuyNow}
          />
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselSlides = [
    {
      title: "50% OFF",
      description: "Surprise your loved ones with our Special Gifts",
      image: "https://images.pexels.com/photos/269887/pexels-photo-269887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection of gifts",
      image: "https://i.pinimg.com/originals/96/24/6e/96246e3c133e6cb5ae4c7843f9e45b22.jpg"
    },
    {
      title: "Special Offers",
      description: "Limited time deals on selected items",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOComponent />
      <ScrollProgress />
      <Navbar />
      <main className="pb-8">
        <Carousel slides={carouselSlides} currentSlide={currentSlide} />
        <ProductGrid title="Top Picks" products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;