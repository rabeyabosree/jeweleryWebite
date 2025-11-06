import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/reducers/authReducer";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Access Redux state
  const { loading, error, success, message } = useSelector((state) => state.auth);

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    // Dispatch thunk to backend
    const result = await dispatch(forgotPassword({ email }));

    if (result.meta.requestStatus === "fulfilled") {
      // Navigate to Verify OTP after success
      navigate("/verify-otp", { state: { email } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef8f2] px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#d4a373] focus:outline-none"
            />
          </div>

          {/* 🔹 Show error or success message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4a373] text-white py-2 rounded-md font-semibold hover:bg-[#b58457] transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-[#d4a373] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
