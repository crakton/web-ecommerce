import React, { useState, useEffect } from "react";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyCart from '../../Images/empty_cart.webp';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../../../hooks";

const CartItems = () => {
  const { cartItems, removeCartItem, updateQty, handleCheckout } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voucher, setVoucher] = useState('');
  const [discountInfo, setDiscountInfo] = useState({
    code: '',
    percentage: 0,
    message: ''
  });

  useEffect(() => {
    if (cartItems?.productsInCart?.length > 0) {
      setLoading(false);
    }
  }, [cartItems]);

  const handleVoucherRedeem = async () => {
    try {
      const response = await axios.post('https://api.merabestie.com/coupon/verify-coupon', {
        code: voucher
      });

      const data = response.data;

      if (data.message === 'Invalid coupon code') {
        setDiscountInfo({
          code: '',
          percentage: 0,
          message: 'Invalid coupon code'
        });
      } else if (data.discountPercentage) {
        setDiscountInfo({
          code: voucher,
          percentage: data.discountPercentage,
          message: `${data.discountPercentage}% discount applied!`
        });
      }
    } catch (err) {
      console.error('Error verifying coupon:', err);
      setDiscountInfo({
        code: '',
        percentage: 0,
        message: 'Error verifying coupon'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || cartItems?.productsInCart?.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center">
        <img src={emptyCart} alt="Empty Cart" className="w-32 sm:w-48 h-32 sm:h-48 mb-4 object-contain" />
        <p className="text-base sm:text-lg text-gray-600 mb-4 text-center">{error || 'Your cart is empty'}</p>
        <Link 
          to="/HomePage" 
          className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200 text-sm sm:text-base"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cart Items Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Cart</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {cartItems?.productsInCart?.map((item) => (
            <div key={item.productId} className="p-3 sm:p-4">
              <div className="flex flex-col gap-4">
                {/* Top Row: Image and Delete Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.img[0] || "https://i.etsystatic.com/19893040/r/il/0ddcd7/3907960016/il_570xN.3907960016_ej9x.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeCartItem(item.productId)}
                    className="text-red-500 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Row: Product Details */}
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-gray-900">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.category || "No category available"}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium text-sm sm:text-base text-gray-900">₹{item.price}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-md bg-gray-50">
                      <button
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-10 text-center bg-transparent border-x text-sm"
                      />
                      <button
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        
        <div className="p-3 sm:p-4 space-y-4">
          {/* Voucher Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter voucher code"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
            />
            <button
              className="w-full sm:w-auto bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVoucherRedeem}
              disabled={!voucher}
            >
              Redeem
            </button>
          </div>

          {/* Discount Message */}
          {discountInfo.message && (
            <div className={`text-sm ${discountInfo.code ? 'text-green-600' : 'text-red-500'} bg-gray-50 p-2 rounded-md`}>
              {discountInfo.message}
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{cartItems?.productsInCart?.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}</span>
            </div>
            
            {discountInfo.percentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discountInfo.percentage}%)</span>
                <span>- ₹{(cartItems?.productsInCart?.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0) * (discountInfo.percentage / 100)).toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            
            <div className="flex justify-between font-semibold text-gray-900 pt-3 border-t">
              <span>Total</span>
              <span>₹{cartItems?.total ?? '0.00'}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors text-sm sm:text-base font-medium mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;