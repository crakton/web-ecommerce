import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, CreditCard, Tag, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Helmet } from "react-helmet";
import Navbar from "../../components/user/navbar/navbar";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slice/cartSlice";
import { fetchUser } from "../../redux/slice/authSlice";
import PaystackPayment from "../../components/user/PaystackPayment";

const Checkout = () => {
  const location = useLocation();
  const discount = parseFloat(location.state?.discount || 0);
  const [shipping, setShipping] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [saveAddress, setSaveAddress] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchUser()); // Fetch user data when logged in
    }
  }, [dispatch, token]);
  
  const carts = useSelector((state) => state.cart.items);
  
  const total = carts?.cart?.total
  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.userId));
    }
  }, [dispatch, user]);

  const cartItems = carts.cart.productsInCart;

  useEffect(() => {
    const savedAddress = localStorage.getItem("savedShippingAddress");
    const savedSaveAddressPreference = localStorage.getItem(
      "saveAddressPreference"
    );

    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setAddress(parsedAddress);
      } catch (error) {
        console.error("Error parsing saved address:", error);
      }
    }

    if (savedSaveAddressPreference) {
      setSaveAddress(JSON.parse(savedSaveAddressPreference));
    }
  }, []);

  useEffect(() => {
    if (Number(total) < 499) {
      setShipping(99);
    } else {
      setShipping(0);
    }
  }, [total]);

  const getCartItemsFromLocalStorage = () => {
    try {
      const localCart = localStorage.getItem("guestCart");
      if (localCart) {
        return JSON.parse(localCart);
      }
    } catch (error) {
      console.error("Error parsing local cart:", error);
    }
    return [];
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = {
      ...address,
      [name]: value,
    };

    setAddress(updatedAddress);

    if (saveAddress) {
      localStorage.setItem(
        "savedShippingAddress",
        JSON.stringify(updatedAddress)
      );
    }
  };

  const handleSaveAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSaveAddress(isChecked);
    localStorage.setItem("saveAddressPreference", JSON.stringify(isChecked));

    if (isChecked) {
      localStorage.setItem("savedShippingAddress", JSON.stringify(address));
    } else {
      localStorage.removeItem("savedShippingAddress");
    }
  };

  const isAddressValid = () => {
    return Object.values(address).every((value) => value.trim() !== "");
  };



  const handlePlaceOrder = async () => {
    const userId = sessionStorage.getItem("userId");

    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-GB");

    const productsOrdered = cartItems.map((item) => ({
      productId: item._id,
      productQty: item.quantity,
    }));

    try {
      if (userId) {
        // Place order through backend if logged in
        const response = await fetch(
          `http://localhost:5000/orders/place-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              date,
              time,
              address: Object.values(address).join(", "),
              price: total + shipping,
              productsOrdered,
              status: "Processing",
              paymentStatus: "Paid",
            }),
          }
        );

        const data = await response.json();

        if (data.message === "Order placed successfully") {
          handleOrderSuccess();
        }
      } else {
        // Handle guest checkout
        // Clear local cart after successful order
        // localStorage.removeItem('guestCart');
        // handleOrderSuccess();
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const handleOrderSuccess = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/cart");
    }, 5000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Helmet>
      <Navbar />

      <div className="container mx-auto px-4 py-14 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Address Section */}
          <div className="md:w-2/3 bg-white rounded-2xl p-8">
            <div className="flex items-center mb-6 space-x-4">
              <h2 className="text-2xl font-normal tracking-widest">
                SHIPPING DETAILS
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="md:col-span-2 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={saveAddress}
                  onChange={handleSaveAddressToggle}
                  className="text-pink-600 focus:ring-pink-500 rounded"
                />
                <label htmlFor="saveAddress" className="text-sm text-gray-700">
                  Save this address for future orders
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6 space-x-4">
              <h2 className="text-4xl font-thin">Order Summary</h2>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img[0] || item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-800 ">
                    ₦ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ₦ {total?.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-green-600" />
                    <span>Discount ({discount}%)</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    - ₦ {carts?.cart?.total * 0.5}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">
                  {shipping > 0 ? `₦ ${shipping}` : "Free"}
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span className="font-thin tracking-widest">
                  ₦ {Math.round(carts?.cart?.total + shipping)}{" "}
                </span>
              </div>

              <div
                disabled={!isAddressValid()}
                className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg transition-all duration-300 ${
                  isAddressValid()
                    ? "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed opacity-50"
                }`}
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CreditCard className="w-6 h-6" />
                )}
                <PaystackPayment amount={total} email={user?.email} />
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your order has been processed. Check your email for tracking
                details.
              </p>
              <button
                onClick={() => navigate("/cart")}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
