import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../redux/reducers/authReducer";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(authLogin(formData))
    navigate("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef8f2] px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#d4a373] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#d4a373] focus:outline-none"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-[#d4a373] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4a373] text-white py-2 rounded-md font-semibold hover:bg-[#b58457] transition"
          >
            {loading ? "Logingg..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Registration successful!</p>}
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-[#d4a373] font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
