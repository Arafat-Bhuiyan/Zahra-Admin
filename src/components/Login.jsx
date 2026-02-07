"use client";
import backgroundImage from "../assets/img/login.png";
import logo from "../assets/img/logo.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "@/Redux/features/auth/authSlice";
import { useEffect } from "react";

export default function Login() {
  const { role } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "teacher") {
      navigate("/teacher");
    }
  }, [role, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Simple role assignment for demo purposes
    if (email === "admin@gmail.com") {
      dispatch(setRole("admin"));
      navigate("/admin");
      return;
    }

    if (email === "teacher@gmail.com") {
      dispatch(setRole("teacher"));
      navigate("/teacher");
      return;
    }

    // fallback for invalid credentials (adjust as needed)
    alert("Invalid credentials");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-[white] rounded-2xl shadow-lg p-8">
        {/* Logo Placeholder */}
        <div className="flex justify-center mb-8">
          <div className="rounded-lg flex items-center justify-center">
            <img src={logo} alt="" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Welcome
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter your email & password.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#205A60] to-[#3B8F97] text-white font-semibold py-3 rounded-full transition duration-200 mt-8"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
