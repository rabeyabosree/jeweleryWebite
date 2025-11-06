import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../../redux/reducers/orderReducer";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Package,
  Filter,
  RefreshCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { allOrders = [], loading, error } = useSelector(
    (state) => state.orders
  );

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const filteredOrders = allOrders.filter((order) => {
    const statusMatch =
      filterStatus === "All" ? true : order.status === filterStatus;
    const paymentMatch =
      filterPayment === "All" ? true : order.paymentMethod === filterPayment;
    return statusMatch && paymentMatch;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ orderId: id, status: newStatus }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <Package className="w-6 h-6 mr-2 text-blue-600" /> All Orders
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Payments</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online</option>
            </select>
          </div>

          <button
            onClick={() => dispatch(getAllOrders())}
            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            {error.message || "Something went wrong"}
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No orders found.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm max-h-[650px] overflow-y-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 sticky top-0 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50" onClick={()=> navigate(`/dashboard/orders/${order._id}`)}>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {order.user?.name || "Unknown"}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {order.user?.email}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {order.isPaid ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Paid
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="w-4 h-4 mr-1" />
                          Unpaid
                        </div>
                      )}
                      <span className="block text-xs text-gray-500 uppercase">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      ৳{order.totalPrice}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded-md text-xs font-medium cursor-pointer focus:ring-1 focus:ring-blue-500 ${order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
