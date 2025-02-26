import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product }) => {
    const handleAddToCart = async (productId) => {
      // const userId = sessionStorage.getItem('userId');
      // If userId is not available, prompt the user to log in
      // if (!userId) {
      //   alert('Please log in to proceed.');
      //   return;
      // }
    
      // Add the product to the cart
      const cartItem = {
        productId,
        quantity: 1,
      };
      cartItems.push(cartItem);
    
      // Transform cart data for checkout
      const transformedData = cartItems.map(item => ({
        variant_id: item.productId,
        quantity: item.quantity,
      }));
    
      console.log("Transformed cart data:", transformedData);
    
      try {
        const response = await fetch('http://localhost:5000/shiprocketapi', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(transformedData),
        });
    
        const checkoutData = await response.json();
        console.log("Checkout token:", checkoutData.token);
    
        // Trigger HeadlessCheckout with the checkout token and fallback URL
        window.HeadlessCheckout.addToCart(null, checkoutData.token, {
          fallbackUrl: "https://your.fallback.com?product=123",
        });
      } catch (error) {
        console.error('Error sending checkout request:', error);
      }
    };
    
    const handleBuyNow = async (productId) => {
      // Simulate adding the product to cart for buy now
      await handleAddToCart(productId);
    };
  
    // const handleBuyNow = async (product) => {
    //   try {
    //     const response = await fetch("https://api.merabestie.com/shiprocketapi", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ product }),
    //     });
  
    //     const data = await response.json();
    //     if (data.success) {
    //       console.log("Shiprocket Token:", data.token);
    //       alert("Order placed successfully!");
    //     } else {
    //       alert("Failed to process the order.");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     alert("An error occurred while placing the order.");
    //   }
    // };
  
    // With fetch API
    // const handleBuyNow = async (product) => {
    //   try {
    //     console.log('Product data:', product);
    //     const response = await axios.post('http://localhost:5000/shiprocketapi', { product });
        
    //     console.log('Full server response:', response);
        
    //     if (response.data.success) {
    //       window.location.href = response.data.redirect_url;
    //     } else {
    //       console.error('Server error details:', response.data);
    //       alert(response.data.message || 'Specific order processing error');
    //     }
    //   } catch (error) {
    //     console.error('Complete error object:', error);
    //     console.error('Error details:', 
    //       error.response?.data || 
    //       error.message || 
    //       'Unhandled error'
    //     );
    //     alert('Detailed error logged in console');
    //   }
    // };
    
    


  

  
    return (
      <motion.div
        className={`bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg relative group ${
          layout === "list" ? "flex flex-col sm:flex-row" : ""
        }`}
        whileHover={{ y: -5 }}
      >
        <Link
          to={`/${product.productId}`}
          className={`block ${layout === "list" ? "sm:w-1/3" : "w-full"}`}
        >
          <div className="relative">
            <img
              src={product.img[0] ? product.img[0] : product.img}
              alt={product.name}
              className="w-full h-64 object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className={`p-4 ${layout === "list" ? "sm:w-2/3" : "w-full"}`}>
          <h4 className="font-medium text-gray-800 text-lg mb-1 truncate">
            {product.name}
          </h4>
          <p className="text-gray-900 font-bold text-lg">₦{product.price}</p>
  
          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              className="bg-primary text-secondary px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    );
  };


  export default ProductCard