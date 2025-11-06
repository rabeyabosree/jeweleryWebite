import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/reducers/authReducer";

function VerifyOtp() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const email = location?.state?.email;


    const { loading, error, success } = useSelector((state) => state.auth);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        if (finalOtp.length === 6) {
            const otpData = { finalOtp, email }
            dispatch(verifyOtp(otpData));
            navigate("/reset-password", { state: { email } })
        } else {
            alert("Please enter all 6 digits of OTP");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#fff7ed]">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#f1e0c5]">
                <h2 className="text-3xl font-bold text-center text-[#b58457] mb-3">
                    Verify OTP
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter the 6-digit code sent to your email
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* OTP BOXES */}
                    <div className="flex justify-between">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength={1}
                                ref={(el) => (inputs.current[index] = el)}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-gray-700"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && (
                        <p className="text-green-600 text-sm text-center">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d4a373] text-white py-2 rounded-md font-semibold hover:bg-[#b58457] transition disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Didn’t get the code?{" "}
                        <button
                            onClick={() => navigate("/forgot-password")}
                            className="text-[#b58457] hover:text-[#a06b44] font-medium transition"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
