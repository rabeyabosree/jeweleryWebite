import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { payOrder } from './../../../redux/reducers/orderReducer';
import { clearCart } from "../../../redux/reducers/cartReducer";

function PaymentPage() {
  const { orderId } = useParams(); // destructured!
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("pending");

  const handlePayment = async (success) => {
    try {
      const paymentResult = {
        id: orderId,
        status: success ? "success" : "failed",
        update_time: new Date()
      }
      await dispatch(payOrder({ orderId, paymentResult }))

      if (success) {
        navigate(`/order-success/${orderId}`);
        dispatch(clearCart())
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h2 className="text-xl font-semibold mb-4">Payment for Order #{orderId}</h2>
      {status === "pending" && (
        <>
          <p className="mb-6">Choose a payment option to complete your order.</p>
          <button
            onClick={() => handlePayment(true)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Simulate Success 💳
          </button>
          <button
            onClick={() => handlePayment(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Simulate Failed ❌
          </button>
        </>
      )}
      {status === "failed" && (
        <p className="text-red-500 mt-6">Payment failed. Try again.</p>
      )}
    </div>
  );
}

export default PaymentPage;
