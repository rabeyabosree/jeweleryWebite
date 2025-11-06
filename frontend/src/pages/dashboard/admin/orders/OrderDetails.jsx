import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder , updateOrderStatus } from "../../../../redux/reducers/orderReducer";
import {
  Loader2,
  User,
  MapPin,
  Package,
  CreditCard,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Truck,
} from "lucide-react";

function OrderDetails() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, loading } = useSelector((state) => state.orders);



  useEffect(() => {
    if (orderId) dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

    const handleStatusChange = (id, newStatus) => {
      dispatch(updateOrderStatus({ orderId: id, status: newStatus }));
    };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No order found.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* -------- Header -------- */}
        <div className="flex flex-wrap justify-between items-center border-b p-6 bg-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              Order #{order._id.slice(-6)}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4" />
              {new Date(order.createdAt).toLocaleString("en-GB")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* -------- Content -------- */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-blue-600" /> Customer Info
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {order.user?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {order.user?.email}
              </p>
            </div>

            {/* Shipping Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" /> Shipping Address
              </h3>
              <p className="text-gray-700">
                {order.shippingAddress?.name} <br />
                {order.shippingAddress?.phone} <br />
                {order.shippingAddress?.area}, {order.shippingAddress?.subDistrict},{" "}
                {order.shippingAddress?.district}
              </p>
            </div>

            {/* Payment Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-blue-600" /> Payment Info
              </h3>
              <div className="flex justify-between items-center text-gray-700">
                <span>Method:</span>
                <span className="font-medium uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 mt-2">
                <span>Status:</span>
                <span className="flex items-center">
                  {order.isPaid ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-blue-600" /> Ordered Items
            </h3>
            <div className="space-y-3 overflow-y-auto pr-2">
              {order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2 text-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <span className="text-gray-700 flex-1 ml-3">{item.title}</span>
                  <span className="text-gray-500">x{item.qty}</span>
                  <span className="font-medium text-gray-800">৳{item.price}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-5 border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span>৳{order.shippingFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
                <span>Total:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  {order.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* -------- Footer: Update Status -------- */}
        <div className="border-t bg-gray-50 p-6 flex justify-end items-center gap-3">
          <select
            className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={order.status}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
