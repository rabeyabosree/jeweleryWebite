import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/reducers/cartReducer";
import { createOrder } from "../../../redux/reducers/orderReducer";

function PlaceMyOrder() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🏠 Shipping Address Fields
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    district: "",
    subDistrict: "",
    area: "",
  });

  // 💳 Payment Method
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const orderId = localStorage.getItem("orderId")

  // const { orderId } = useSelector((state) => state.orders)
  // console.log(orderId)

  const paymentOptions = [
    { id: "cod", label: "Cash on Delivery" },
    { id: "card", label: "Credit/Debit Card" },
    { id: "bkash", label: "Bkash / Nagad" },
  ];

  // 💰 Price Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 📦 Shipping Fee based on location (example logic)
  const shippingFee =
    shipping.district.toLowerCase() === "dhaka"
      ? 60
      : shipping.district
        ? 100
        : 0;

  const total = subtotal + shippingFee;

  // 🧾 Handle Order
  const handleOrder = () => {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      title: item.title,
      image: item.image,
      qty: item.qty,
      price: item.price,
    }));

    const orderData = {
      orderItems,
      shippingAddress: shipping,
      paymentMethod,
      subtotal
    };

    dispatch(createOrder(orderData))

    if (paymentMethod === "cod") {
      dispatch(clearCart());
      navigate("/");
    } else {
      navigate(`/payment/${orderId}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🏠 Shipping Address */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>

          {["name", "phone", "district", "subDistrict", "area"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={shipping[field]}
              onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
              className="w-full border p-2 rounded-md"
            />
          ))}
        </div>

        {/* 💳 Payment Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* 🧾 Order Summary */}
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-3">Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between mb-2">
                <span>
                  {item.title} x {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <hr className="my-2" />

            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingFee.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </p>

            <button
              onClick={handleOrder}
              className="mt-4 w-full bg-[#d4a373] text-white py-2 rounded-md hover:bg-[#b58457] transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceMyOrder;
