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
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import LearnMore from "./pages/user/learnmore";
import BlogView from "./pages/landingPage/BlogView";
import Blogs from "./pages/landingPage/Blogs";
import LandingPage from "./pages/landingPage/LandingPage";
import MainLayout from "./layouts/LandingLayout";
import TrainingHub from "./pages/landingPage/TrainingHub";
import AssistiveTechPage from "./pages/landingPage/AssistiveTech";
import Checkout from "./pages/user/checkout";
import StoreLayout from "./layouts/StoreLayout";
import SearchPage from "./pages/user/Search";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
        <Routes>
  {/* Admin base route */}
  <Route path="/admin" element={<Admin />} />

  {/* Admin Panel - Seller Dashboard */}
  <Route path="/admin/" element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="products" element={<Product />} />
    <Route path="orders" element={<Orders />} />
    <Route path="customers" element={<Customers />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="complaints" element={<Complaints />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="SEO" element={<SEO />} />
  </Route>

  {/* Seller Authentication */}
  <Route path="/seller/login" element={<LoginPage />} />
  <Route path="/seller/signup" element={<SellerPage />} />

  {/* Store (User Shop Area) */}
  <Route element={<StoreLayout />}>
    <Route path="/store" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/jobs" element={<OccasionsPage />} />
    <Route path="/gift-boxes" element={<GiftBox />} />
    <Route path="/books" element={<GiftBox />} />
    <Route path="/stationery" element={<GiftBox />} />
    <Route path="/cart" element={<ShoppingCartPage />} />
    <Route path="/orders" element={<Order />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/learnmore" element={<LearnMore />} />
  </Route>

  {/* Landing Pages */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blog/:id" element={<BlogView />} />
    <Route path="/training" element={<TrainingHub />} />
    <Route path="/assistive-tech" element={<AssistiveTechPage />} />
  </Route>

  {/* 404 - Not Found */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>

        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
