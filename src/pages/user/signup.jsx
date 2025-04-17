import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/slice/authSlice"; // Import Redux action
import Navbar from "../../components/user/navbar/navbar";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";

export default function SignUp() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading,setLoading] = useState()
  const [error, setError] = useState()


  const formData = { name, email, password, phone}

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }
try {
  
  dispatch(registerUser(formData));
  dispatch(loginUser(email,password))
} catch (error) {
  setError("Error creating account please try again")
  
}
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <motion.div 
          className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden mt-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 120
          }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-extrabold text-gray-900 mx-5 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-primary mt-2">
                Zang Global
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-primary" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-primary" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mobile Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="text-primary" />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-primary transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-primary" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition duration-300 transform active:scale-95"
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account? 
                <a href="/login" className="text-primary hover:text-pink-800 ml-2 font-semibold">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
