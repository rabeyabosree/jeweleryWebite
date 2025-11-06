import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../redux/reducers/orderReducer";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Package,
  MapPin,
  CreditCard,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function MyOrders() {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.orders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [collapsedItems, setCollapsedItems] = useState(true);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

        {/* Filter */}
        <div className="flex items-center mb-6 space-x-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            {error.message || "Something went wrong"}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No orders found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* -------- LEFT: Orders List -------- */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-h-[650px] overflow-y-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer hover:bg-gray-50 transition ${
                        selectedOrder?._id === order._id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-800">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium 
                          ${order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        ৳{order.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* -------- RIGHT: Order Details -------- */}
            {selectedOrder ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-h-[650px] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" /> Order Details
                </h3>

                {/* Summary */}
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-medium">#{selectedOrder._id.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="flex items-center">
                      {selectedOrder.isPaid ? (
                        <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1 text-red-500" />
                      )}
                      {selectedOrder.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span>৳{selectedOrder.shippingFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>৳{selectedOrder.totalPrice}</span>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Shipping Info */}
                <h4 className="font-semibold text-gray-800 flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" /> Shipping Address
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedOrder.shippingAddress?.name}, {selectedOrder.shippingAddress?.phone}
                  <br />
                  {selectedOrder.shippingAddress?.area}, {selectedOrder.shippingAddress?.subDistrict}, {selectedOrder.shippingAddress?.district}
                </p>

                <hr className="my-4" />

                {/* Order Items */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-blue-600" /> Items
                  </h4>
                  <button
                    onClick={() => setCollapsedItems(!collapsedItems)}
                    className="text-blue-600 flex items-center text-sm font-medium"
                  >
                    {collapsedItems ? "Show All" : "Collapse"}
                    {collapsedItems ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronUp className="w-4 h-4 ml-1" />}
                  </button>
                </div>

                {!collapsedItems && (
                  <div className="space-y-2">
                    {selectedOrder.orderItems.map((item, i) => (
                      <div key={i} className="flex items-center border-b pb-2 text-sm space-x-3">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-md border border-gray-200" />
                        <span className="text-gray-700 flex-1">{item.title}</span>
                        <span className="text-gray-500">x{item.qty}</span>
                        <span className="font-medium text-gray-800">৳{item.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center text-gray-400 border border-dashed border-gray-300 rounded-lg p-10 max-h-[650px]">
                <Package className="w-12 h-12 mb-2" />
                <p>Select an order to see details</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;

