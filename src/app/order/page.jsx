"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Truck, XCircle, Loader, Clock } from "lucide-react";
import Swal from "sweetalert2";

// Helper function to format date
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-IN", options);
};

export default function CustomerOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get token & userId from localStorage
  const authToken = localStorage.getItem("authToken");
  const authUserId = localStorage.getItem("authUserId");

  //   // ✅ Redirect if not logged in
  //   useEffect(() => {
  //     if (!authToken || !authUserId) {
  //       console.error("Auth token or userId not found in localStorage");
  //       navigate("/login");
  //     }
  //   }, [authToken, authUserId, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User not logged in. Please login first.");
          setOrders([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://coombb.com/backend/api/get-user-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response?.data && Array.isArray(response?.data?.data)) {
          setOrders(response.data.data);
        } else {
          setError("No orders found.");
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            <Clock size={16} />
            Pending
          </span>
        );

      case "processing":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
            <Loader size={16} />
            Processing
          </span>
        );

      case "shipped":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <Truck size={16} />
            Shipped
          </span>
        );

      case "delivered":
      case "reached":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            <CheckCircle size={16} />
            Delivered
          </span>
        );

      case "cancelled":
      case "canceled":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
            <XCircle size={16} />
            Cancelled
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
            {status || "Unknown"}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 bg-black-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 text-center">📦 My Orders</h1>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-black-600 dark:text-black-300">
          Loading your orders...
        </p>
      )}

      {/* Error State */}
      {error && !loading && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {/* Orders List */}
      {!loading && !error && (
        <div className="space-y-6">
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-3 sm:p-5"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="min-w-0 w-full">
                      <h2 className="text-lg sm:text-xl font-semibold text-black-800 break-words">
                        Order #{order.order_code}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-black-600">
                        <p>
                          <span className="font-medium">Order Date:</span>{" "}
                          {formatDate(order.order_date)}
                        </p>

                        <p>
                          <span className="font-medium">Payment Status:</span>{" "}
                          {order.payment_status}
                        </p>

                        <p>
                          <span className="font-medium">Total Amount:</span>{" "}
                          <span className="text-base sm:text-lg font-bold text-red-600">
                            £
                            {Number(order.total_amount).toLocaleString("en-IN")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {getStatusBadge(order.order_status)}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    {order.order_details.data.map((orderDetail) => (
                      <div
                        key={orderDetail.id}
                        className="flex flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-black-50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              orderDetail.products.default_image ||
                              "/placeholder.svg"
                            }
                            alt={orderDetail.products.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-200 bg-white"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg font-semibold text-black-800 break-words">
                            {orderDetail.products.name}
                          </h3>

                          <p className="text-black-500 text-xs sm:text-sm mb-2 line-clamp-2">
                            {orderDetail.products.short_description}
                          </p>

                          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm text-black-600">
                            {/* Color */}
                            <div className="flex items-center gap-1 min-w-0">
                              <span className="font-medium flex-shrink-0">
                                Color:
                              </span>

                              <div className="flex items-center gap-1 min-w-0">
                                {orderDetail.colors.hexa_code_2 ? (
                                  <div className="relative flex-shrink-0 w-4 h-4 rounded-full border border-black-300 overflow-hidden">
                                    <div
                                      className="absolute left-0 top-0 w-1/2 h-full"
                                      style={{
                                        backgroundColor:
                                          orderDetail.colors.hexa_code,
                                      }}
                                    />

                                    <div
                                      className="absolute right-0 top-0 w-1/2 h-full"
                                      style={{
                                        backgroundColor:
                                          orderDetail.colors.hexa_code_2,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <span
                                    className="inline-block flex-shrink-0 w-4 h-4 rounded-full border border-black-300"
                                    style={{
                                      backgroundColor:
                                        orderDetail.colors.hexa_code,
                                    }}
                                  />
                                )}

                                <span className="truncate">
                                  {orderDetail.colors.name}
                                </span>
                              </div>
                            </div>

                            {/* Size */}
                            <p>
                              <span className="font-medium">Size:</span>{" "}
                              {orderDetail.sizes.name}
                            </p>

                            {/* Quantity */}
                            <p>
                              <span className="font-medium">Quantity:</span>{" "}
                              {orderDetail.quantity}
                            </p>

                            {/* Price */}
                            <p>
                              <span className="font-medium">Price:</span>{" "}
                              <span className="font-bold text-red-600">
                                £
                                {Number(orderDetail.price).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            </p>
                          </div>

                          {/* Delivery Status */}
                          <div className="mt-2">
                            {getStatusBadge(order.order_status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-black-600 dark:text-black-300">
              You have no orders yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
