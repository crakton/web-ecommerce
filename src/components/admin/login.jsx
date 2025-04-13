import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../user/navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/Admin";
import AdminNavbar from "./navbar";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState("");
  const [email, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [showResendButton, setShowResendButton] = useState(false);
  const [error, setError] = useState("");

  const {login} = useAdminAuth()

  console.log("admin");

  const handleLogin = async () => {
    if ( !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
     login(email,password)
      console.log(email,password)
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Zang Global</title>
      </Helmet>
      <div className="sticky top-0">

      <AdminNavbar />
      </div>
    
      <div className="h-[80vh] bg-slate-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Admin Login
              </h2>
              <p className="text-mutedPrimary mt-2">
                Log in to Admin Dashboard
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-primary" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={email}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>

              {showResendButton && (
                <button
                  type="button"
                  className="w-full bg-primary hover:bg-mutedPrimary text-white py-3 rounded-lg font-semibold transition duration-300 transform active:scale-95"
                >
                  Resend OTP
                </button>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-mutedPrimary transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <motion.button
                type="button"
                className={`w-full bg-primary hover:bg-mutedPrimary text-white py-3 rounded-lg font-semibold transition duration-300 transform active:scale-95 ${
                  !otpVerified ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleLogin}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

     
    </>
  );
};

export default AdminLogin;
