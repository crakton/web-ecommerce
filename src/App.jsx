import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/user/productdetails";
import About from "./pages/user/about";
import Contact from "./pages/user/contact";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import HomePage from "./pages/user/homepage";
import ShoppingCartPage from "./pages/user/cart";
import Shop from "./pages/user/shop";
import OccasionsPage from "./pages/user/occasionspage";
import Checkout from "./pages/user/checkout";
import Product from "./pages/admin/product";
import LoginPage from "./pages/admin/login";
import SellerPage from "./pages/admin/signup";
import Complaints from "./pages/admin/complaints";
import Orders from "./pages/admin/order";
import Customers from "./pages/admin/customer";
import CalendarPage from "./pages/admin/calendar";
import NotFoundPage from "./pages/user/notfound";
import Admin from "./pages/admin/admin";
import CouponPage from "./pages/admin/coupon";
import DashboardPage from "./pages/admin/dashboard";
import Order from "./pages/user/orders";
import GiftBox from "./pages/user/gift-box";
import Reviews from "./pages/admin/review";
import SEO from "./pages/admin/SEO";
import { ToastContainer } from 'react-toastify';
import LandingPage from "./pages/user/LandingPage";
import Blogs from "./pages/user/Blogs";
import BlogView from "./pages/user/BlogView";
import { Provider } from "react-redux";
import store from "./redux/store"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/slice/cartSlice";
import LearnMore from "./pages/user/learnmore";



function App() {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchCart(user.userId)); // Fetch cart when user logs in
  //   }
  // }, [dispatch, user])
  return (
    // Wrap the entire app in AuthProvider




    <Provider store={store}>

      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/blog/:id" element={<BlogView />} />
          <Route path="/store" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/jobs" element={<OccasionsPage />} />
          <Route path="/gift-boxes" element={<GiftBox />} />
          <Route path="/books" element={<GiftBox />} />
          <Route path="/stationery" element={<GiftBox />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/admin/:sellerId" element={<DashboardPage />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller/login" element={<LoginPage />} />
          <Route path="/seller/coupons/:sellerId" element={<CouponPage />} />
          <Route path="/seller/signup" element={<SellerPage />} />
          <Route path="/admin/products/:sellerId" element={<Product />} />
          <Route path="/admin/complaints/:sellerId" element={<Complaints />} />
          <Route path="/admin/orders/:sellerId" element={<Orders />} />
          <Route path="/admin/customers/:sellerId" element={<Customers />} />
          <Route path="/admin/calendar/:sellerId" element={<CalendarPage />} />
          <Route path="/admin/reviews/:sellerId" element={<Reviews />} />
          <Route path="/admin/SEO/:sellerId" element={<SEO />} />
          <Route path="/learnmore" element={<LearnMore />} />


          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
