"use client";

import { useState } from "react";
import { FiX, FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { LuCalendar, LuBookMarked } from "react-icons/lu";
import axios from "../utils/Axios";
import PropTypes from "prop-types";

const SignupModal = ({ onClose, onSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !course || !year) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/user/register", {
        name,
        email,
        password,
        course,
        year,
      });

      setRegistrationSuccess(true);
      
      if (typeof onSignup === "function") {
        onSignup(response.data);
      }

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        if (typeof onClose === "function") {
          onClose();
        }
        navigate("/login"); // Kept as /login
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8f8f8] bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl transform transition-all duration-300 mx-4">
        {registrationSuccess ? (
          <div className="p-8 text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-2">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">Redirecting to login page...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <button 
                className="text-gray-500 hover:text-black transition-colors"
                onClick={() => typeof onClose === "function" && onClose()}
                disabled={loading}
              >
               <Link to="/landing"><FiX size={20} /></Link> {/* Changed from / to /landing */}
              </button>
            </div>

            {/* Form Layout */}
            <form className="p-5" onSubmit={handleSubmit}>
              {error && <div className="bg-red-100 text-red-600 p-3 rounded-md mb-5 text-sm">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FiUser className="text-black" size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FiMail className="text-black" size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FiLock className="text-black" size={16} />
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <FiLock className="text-black" size={16} />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>

                {/* Course Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <LuBookMarked className="text-black" size={16} />
                    Course
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter your course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Year Field */}
                <div>
                  <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
                    <LuCalendar className="text-black" size={16} />
                    Year
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Enter your year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 mt-5 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 text-center text-gray-700">
              <p>
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-black font-medium hover:opacity-80 transition-opacity" 
                  onClick={() => typeof onClose === "function" && onClose()}
                >
                  Login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default SignupModal;