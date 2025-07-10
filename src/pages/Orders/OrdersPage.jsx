import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/slices/orderSlice";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { data: order, loading, error } = useSelector((state) => state.orders);

  const handleCancel = async (productId, qty) => {
    try {
      await axiosInstance.post("/order/remove", { productId, qty });
      toast.success("Product removed from order");
      dispatch(fetchOrders());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cancel failed");
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!order) return <p className="text-center mt-10">No orders found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Your Orders</h2>

      {order.products.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 mb-4 flex items-center justify-between"
        >
          <div>
            <p className="font-medium">
              {item.productId.title || "Product Name"}
            </p>
            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
          </div>

          <button
            onClick={() => handleCancel(item.productId._id, item.qty)}
            className="text-red-600 hover:underline text-sm"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
